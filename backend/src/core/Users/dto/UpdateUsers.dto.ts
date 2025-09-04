import {CreateUsersDto} from "./CreateUsers.dto";
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateUsersDto extends PartialType(
    OmitType(CreateUsersDto, [] as const),
){}
