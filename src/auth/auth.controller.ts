import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'nest-keycloak-connect';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  @Public()
  async getAccessToken(@Body() credential) {
    const jwtToken = await this.authService.getAccessToken(
      credential.username,
      credential.password,
    );
    if (jwtToken) return jwtToken;
    throw new BadRequestException();
  }

  @Get('')
  @Public()
  getUserInfo(@Query('access_token') access_token) {
    return this.authService.getUserInfo(access_token);
  }
}
