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

@Module({
  imports: [
    ConfigModule,
    KeycloakConnectModule.registerAsync({
      useFactory: () => ({
        authServerUrl: process.env.KEYCLOAK_URL,
        realm: process.env.KEYCLOAK_REALM,
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        secret: process.env.KEYCLOAK_CLIENT_SECERT,
        cookieKey: 'JWT',
        tokenValidation: TokenValidation.OFFLINE,
      }),
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
