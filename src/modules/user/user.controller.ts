import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {LoggingInterceptor} from '../../interceptors/logging.interceptor'
import { ClassInterceptor } from 'src/interceptors/class.interceptor';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseInterceptors(LoggingInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log("da vao find all",createUserDto)
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    console.log("da vao find all")
    return this.userService.findAll();
  }

  @UseInterceptors(ClassInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      id: 1,
      name: "ntbphuoc",
      pass: "123sadasd",
      role: "admin",
      status: true
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
