import { Test, TestingModule } from '@nestjs/testing';
import {AuthController} from "../auth/auth.controller";
import {AuthService} from "../auth/auth.service";
import {RegisterDto} from "../auth/dto/register.dto";
import {LoginDto} from "../auth/dto/login.dto";

describe('AuthController', () => {
    let controller: AuthController;
    let authService: jest.Mocked<AuthService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        register: jest.fn(),
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get(AuthService);
    });

    describe('register', () => {
        it('should call AuthService.register and return result', async () => {
            const dto: RegisterDto = {
                userName: 'John',
                userEmail: 'john@example.com',
                userPhone: '1234567890',
                userPassword: 'password123',
            };

            const response = {
                success: true,
                message: 'User registered successfully',
                accessToken: 'mock-token',
            };

            authService.register.mockResolvedValue(response);

            const result = await controller.register(dto);

            expect(authService.register).toHaveBeenCalledWith(dto);
            expect(result).toEqual(response);
        });
    });

    describe('login', () => {
        it('should call AuthService.login and return result', async () => {
            const dto: LoginDto = {
                userEmail: 'john@example.com',
                userPassword: 'password123',
            };

            const response = {
                success: true,
                message: 'Login successful',
                accessToken: 'mock-token',
            };

            authService.login.mockResolvedValue(response);

            const result = await controller.login(dto);

            expect(authService.login).toHaveBeenCalledWith(dto);
            expect(result).toEqual(response);
        });
    });
});
