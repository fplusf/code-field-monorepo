import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './google-authentication.service';
import { GoogleTokenDto } from '../dto/google-token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('authentication/google')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService
  ) {}

  @Post()
  authenticate(@Body() tokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authenticate(tokenDto.idToken);
  }
}
