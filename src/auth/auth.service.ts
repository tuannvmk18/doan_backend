import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.originUrl = this.configService.get<string>('KEYCLOAK_URL');
    this.originRealm = this.configService.get<string>('KEYCLOAK_REALM');
  }

  private originUrl: string;
  private originRealm: string;

  async getAccessToken(username: string, password: string): Promise<any> {
    const url = `${this.originUrl}/realms/${this.originRealm}/protocol/openid-connect/token`;
    const formData: URLSearchParams = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append(
      'client_secret',
      this.configService.get<string>('KEYCLOAK_CLIENT_SECRET'),
    );
    formData.append(
      'client_id',
      this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
    );
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async getUserInfo(accessToken: string): Promise<any> {
    const url = `${this.originUrl}/realms/${this.originRealm}/protocol/openid-connect/userinfo`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }),
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
}
