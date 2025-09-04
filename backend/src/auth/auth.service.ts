import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../core/Users/Users.service";
import {JwtService} from "@nestjs/jwt";
import {RegisterDto} from "./dto/register.dto";
import {AuthResponse} from "./interface/AuthResponse";
import {LoginDto} from "./dto/login.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(data: RegisterDto): Promise<AuthResponse> {
        const hashedPassword = await bcrypt.hash(data.userPassword, 10);

        const userResponse  = await this.usersService.create({
            ...data,
            userPassword: hashedPassword,
        });

        const user = userResponse.data;

        return {
            success: true,
            message: 'User registered successfully',
            accessToken: this.jwtService.sign({
                sub: user.userId,
                email: user.userEmail,
            }),
        };
    }

    async login(data: LoginDto): Promise<AuthResponse> {
        const user = await this.usersService.findByEmail(data.userEmail);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isValid = await bcrypt.compare(data.userPassword, user.userPassword);
        if (!isValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return {
            success: true,
            message: 'Login successful',
            accessToken: this.jwtService.sign({ sub: user.userId, email: user.userEmail }),
        };
    }
}