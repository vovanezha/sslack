import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { User } from './domain/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create({
      login: createUserDto.login,
      password: createUserDto.password,
      email: createUserDto.email,
      firstName: createUserDto.firstName || 'Good',
      lastName: createUserDto.lastName || 'Boy',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.find(Number(id));

    if (!user) {
      throw new HttpException('You are looser', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
