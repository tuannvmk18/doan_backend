import { Module } from '@nestjs/common';
import { KeycloakProvider } from './keycloak.provider';

@Module({
  providers: [KeycloakProvider],
  exports: [KeycloakProvider],
})
export class KeycloakModule {}
