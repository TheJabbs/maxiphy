import { IsString, IsEmail, Length, MaxLength } from 'class-validator';

export class CreateUsersDto {
    @IsString()
    @Length(1, 30)
    userName: string;

    @IsEmail()
    @MaxLength(30)
    userEmail: string;

    @IsString()
    @MaxLength(30)
    userPhone: string;

    @IsString()
    userPassword: string;
}
