import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  @Roles({ roles: ['thecoffeehouse:admin'], mode: RoleMatchingMode.ANY })
  create_user(@Body() createUserDto: CreateUserDto, @Req() req) {
    return this.userService.createUser(
      createUserDto,
      req.headers.authorization,
    );
  }

  @Get('')
  findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return this.userService.findAll(+skip, +take);
  }
}
