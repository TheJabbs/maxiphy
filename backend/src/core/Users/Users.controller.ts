import {Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { UsersService } from './Users.service';
import { CreateUsersDto } from './dto/CreateUsers.dto';
import { UpdateUsersDto } from './dto/UpdateUsers.dto';
import {AuthGuard} from "@nestjs/passport";

@Controller('Users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const res = await this.UsersService.findAll();
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: number) {
    const res = await this.UsersService.findOne(+id);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Post()
  async create(@Body() dto: CreateUsersDto) {
    const res = await this.UsersService.create(dto);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateUsersDto) {
    const res = await this.UsersService.update(+id, dto);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number) {
    const res = await this.UsersService.remove(+id);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }
}
