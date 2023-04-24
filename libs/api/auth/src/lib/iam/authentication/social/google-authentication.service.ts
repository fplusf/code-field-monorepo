import {
  ConflictException,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AuthenticationService } from '../authentication.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  onModuleInit() {
    this.oauthClient = new OAuth2Client(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET')
    );
  }

  async authenticate(token: string) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
      });

      const {
        email,
        sub: googleId,
        picture: avatar,
      } = loginTicket.getPayload();
      const user = await this.usersRepository.findOneBy({ googleId });

      if (user) {
        return this.authService.generateTokens(user);
      } else {
        const newUser = await this.usersRepository.save({
          email,
          googleId,
          avatar,
        });
        return this.authService.generateTokens(newUser);
      }
    } catch (error) {
      const uniquViloationCode = '23505';
      if (error.code === uniquViloationCode) {
        throw new ConflictException('User already exists');
      }
      throw new UnauthorizedException();
    }
  }
}
