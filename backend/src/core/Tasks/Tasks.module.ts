import { Module } from '@nestjs/common';
import { TasksController } from './Tasks.controller';
import { TasksService } from './Tasks.service';
import {AuthModule} from "../../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
