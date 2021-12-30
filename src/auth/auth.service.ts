import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './dto/user-create-event';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {
  private readonly _logger = new Logger(AuthService.name);
  private userRepository: Repository<User>;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectConnection() connection: Connection,
  ) {
    this.originUrl = this.configService.get<string>('KEYCLOAK_URL');
    this.originRealm = this.configService.get<string>('KEYCLOAK_REALM');
    this.userRepository = connection.getRepository(User);
  }

  private readonly originUrl: string;
  private readonly originRealm: string;

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
      const result = await this.userRepository.findOne({
        username: response.data.preferred_username,
      });
      return result;
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @OnEvent('user.created', { async: true })
  async handleOrderCreatedEvent(
    payload: UserCreatedEvent,
    accessToken: string,
  ) {
    const url = `${this.originUrl}/admin/realms/${this.originRealm}/users`;
    const body = {
      firstName: payload.first_name,
      lastName: payload.last_name,
      email: payload.email,
      credentials: [
        {
          type: 'password',
          value: payload.password,
          temporary: false,
        },
      ],
      enabled: true,
      username: payload.username,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, body, {
          headers: {
            Authorization: accessToken,
          },
        }),
      );
    } catch (e) {
      this._logger.error(e);
    }
  }
}
