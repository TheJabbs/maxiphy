import {CreateTasksDto} from "./CreateTasks.dto";
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateTasksDto extends PartialType(
    OmitType(CreateTasksDto, [] as const),
){}
