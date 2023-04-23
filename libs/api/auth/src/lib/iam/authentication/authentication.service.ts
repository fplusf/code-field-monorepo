import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { randomUUID } from 'crypto';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { InvalidatedRefreshTokenError } from './errors/invalidated-refresh-token';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly hashService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
  ) {}

  async signUp({ firstName, lastName, username, email, password }: SignUpDto) {
    try {
      const hashedPassword = await this.hashService.hash(password);
      const user = this.usersRepository.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      const uniqueConstraintError = error.code === '23505';
      if (uniqueConstraintError) {
        throw new ConflictException('Username or email already exists');
      }
      throw error;
    }
  }

  async signIn({ username, email, password }: SignInDto) {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const passwordMatches = await this.hashService.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const refreshTokenId = randomUUID();

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(user.id, this.jwtConfiguration.accessExpiresIn, {
        email: user.email,
        username: user.username,
        roles: user.roles,
      }),
      this.signToken(user.id, this.jwtConfiguration.refreshExpiresIn, {
        refreshTokenId,
      }),
    ]);

    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & Pick<TokenPayload, 'refreshTokenId'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersRepository.findOneByOrFail({
        id: sub,
      });

      const isValidRefreshToken = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId
      );

      if (!isValidRefreshToken) {
        throw new Error();
      } else {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      }

      return await this.generateTokens(user);
    } catch (error) {
      if (error instanceof InvalidatedRefreshTokenError) {
        // TODO: Notify user (through email or profie notifications) that his refresh token might have been stolen
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async signToken(userId: number, expiresIn: number, payload?: TokenPayload) {
    return this.jwtService.signAsync(
      { sub: userId, ...payload },
      {
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        expiresIn,
      }
    );
  }
}
