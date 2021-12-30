import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../../auth/dto/user-create-event';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;
  constructor(
    @InjectConnection() connection: Connection,
    private eventEmitter: EventEmitter2,
  ) {
    this.userRepository = connection.getRepository(User);
  }

  async createUser(createUserDto: CreateUserDto, accessToken: string) {
    const newUser = this.userRepository.create(createUserDto);
    try {
      await this.userRepository.save(newUser);
      this.eventEmitter.emit(
        'user.created',
        new UserCreatedEvent(createUserDto),
        accessToken,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    return newUser;
  }

  async findAll(skip: number = undefined, take: number = undefined) {
    return await this.userRepository.find({
      skip: skip,
      take: take,
    });
  }
}
