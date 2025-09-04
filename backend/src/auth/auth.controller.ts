import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthResponse} from "./interface/AuthResponse";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginDto): Promise<AuthResponse> {
    return this.authService.login(data);
  }
}
