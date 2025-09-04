import { IsString, IsOptional, IsBoolean, IsInt, IsDate, IsDecimal, IsNumber, Length, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTasksDto {
    @IsString()
    @Length(1, 20) // taskName must be between 1–20 chars
    taskName: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    taskDescription?: string;

    @IsOptional()
    @IsBoolean()
    taskPinned?: boolean;

    @IsOptional()
    @IsInt()
    taskPriority?: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    taskCreation?: Date;

    @Type(() => Date)
    @IsDate()
    taskStart: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    taskFinish?: Date;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    progressMax?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    progress?: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    taskAccomplished?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    lastProgress?: Date;
}
