import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  TokenValidation,
} from 'nest-keycloak-connect';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeycloakProvider implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: process.env.KEYCLOAK + '/auth',
      realm: process.env.KEYCLOAD_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAD_CLIENT_SECERT,
      cookieKey: 'JWT',
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
