import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsersDto } from './dto/CreateUsers.dto';
import { UpdateUsersDto } from './dto/UpdateUsers.dto';
import { ResponseInterface } from '../../shared/interface/ResponseInterface';
import {GetUsers} from "./interface/GetUsers";
import {Users} from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUsersDto): Promise<ResponseInterface<GetUsers | null>> {
    const record = await this.prisma.users.create({ data });
    return { success: true, message: '{Name} created successfully', data: record };
  }

  async findAll(): Promise<ResponseInterface<GetUsers[]>> {
    const records = await this.prisma.users.findMany();
    return { success: true, message: '{Name} list retrieved successfully', data: records };
  }

  async findOne(id: number): Promise<ResponseInterface<GetUsers | null>> {
    const record = await this.prisma.users.findUnique({ where: { userId: id } });
    if (!record) {
      return { success: false, message: `{Name} with ID ${id} not found` };
    }
    return { success: true, message: '{Name} retrieved successfully', data: record };
  }

  async update(id: number, data: UpdateUsersDto): Promise<ResponseInterface<GetUsers>> {
    const record = await this.prisma.users.update({ where: { userId: id }, data });
    return { success: true, message: '{Name} updated successfully', data: record };
  }

  async remove(id: number): Promise<ResponseInterface<GetUsers>> {
    await this.prisma.users.delete({ where: { userId: id } });
    return { success: true, message: '{Name} deleted successfully' };
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({ where: { userEmail: email } });
  }
}
