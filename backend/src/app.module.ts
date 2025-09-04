import { Module } from '@nestjs/common';
import {PrismaModule} from "./prisma/prisma.module";
import {ErrorLoggingModule} from "./core/ErrorLogging/ErrorLogging.module";
import {TasksModule} from "./core/Tasks/Tasks.module";
import {UsersModule} from "./core/Users/Users.module";
import {AuthModule} from "./auth/auth.module";


@Module({
  imports: [PrismaModule, ErrorLoggingModule, TasksModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
