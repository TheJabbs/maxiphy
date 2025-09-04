import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
  Query
} from '@nestjs/common';
import { TasksService } from './Tasks.service';
import { CreateTasksDto } from './dto/CreateTasks.dto';
import { UpdateTasksDto } from './dto/UpdateTasks.dto';
import {AuthGuard} from "@nestjs/passport";
import {CurrentUser} from "../../auth/decorator/current-user.decorator";
import {AuthUser} from "../../auth/interface/AuthUser";

@Controller('Tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly TasksService: TasksService) {}

  @Get()
  findAll(
      @CurrentUser() user: AuthUser,
      @Query('page') page = 1,
      @Query('limit') limit = 20,
  ) {
    return this.TasksService.findAll(user, Number(page), Number(limit));
  }


  @Get('id=:id')
  async findOne(@Param('id') id: number, @CurrentUser() user: AuthUser) {
    const res = await this.TasksService.findOne(+id, user);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Get('sorted')
  async findAllSorted(@CurrentUser() user: AuthUser){
    const res = await this.TasksService.findAllSorted(user);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Get('classified')
  async findAllClassified(@CurrentUser() user: AuthUser){
    const res = await this.TasksService.findAllClassified(user);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Post()
  async create(@Body() dto: CreateTasksDto, @CurrentUser() user: AuthUser) {
    const res = await this.TasksService.create(dto, user);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateTasksDto, @CurrentUser() user: AuthUser) {
    const res = await this.TasksService.update(+id, dto, user);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @CurrentUser() user: AuthUser) {
    const res = await this.TasksService.remove(+id, user);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }
}
