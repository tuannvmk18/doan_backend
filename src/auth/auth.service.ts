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
    this.originUrl = this.configService.get<string>('KEYCLOAD_URL');
  }

  private originUrl: string;

  async getAccessToken(username: string, password: string): Promise<any> {
    const url =
      this.originUrl + `/auth/realms/authservice/protocol/openid-connect/token`;
    const formData: URLSearchParams = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append('client_secret', 'z2t6TuLNjnmF99SGQt0eXmRhzJrctBQY');
    formData.append('client_id', 'thecoffeehouse');
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
      return null;
    }
  }

  async getUserInfo(accessToken: string): Promise<any> {
    const url =
      this.originUrl +
      `/auth/realms/authservice/protocol/openid-connect/userinfo`;
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
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
