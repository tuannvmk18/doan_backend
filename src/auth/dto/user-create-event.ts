export class UserCreatedEvent {
  constructor(payload: any) {
    this.first_name = payload.first_name;
    this.last_name = payload.last_name;
    this.email = payload.email;
    this.username = payload.username;
    this.password = payload.password;
  }

  first_name: string;

  last_name: string;

  email: string;

  username: string;

  password: string;
}
