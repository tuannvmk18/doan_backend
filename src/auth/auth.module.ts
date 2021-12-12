import { Module } from '@nestjs/common';
import {
  AuthGuard,
  KeycloakConnectModule,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { KeycloakProvider } from './keycloak/keycloak.provider';

@Module({
  imports: [
    ConfigModule,
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'authservice',
      clientId: 'Thecoffeehouse',
      secret: 'z2t6TuLNjnmF99SGQt0eXmRhzJrctBQY',
      cookieKey: 'JWT',
      tokenValidation: TokenValidation.OFFLINE,
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AuthModule {}
