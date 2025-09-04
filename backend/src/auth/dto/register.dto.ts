import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MaxLength(30)
    userName: string;

    @IsEmail()
    @MaxLength(30)
    userEmail: string;

    @IsString()
    @MaxLength(30)
    userPhone: string;

    @IsString()
    @MinLength(6)
    userPassword: string;
}
