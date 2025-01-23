import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
    schema: {
      example: {
        message: 'User registered successfully',
        user: {
          id: 1,
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          age: 30,
          image: 'https://example.com/avatar.jpg',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Пользователь с таким email уже существует' })
  @ApiBody({
    description: 'Данные для регистрации пользователя',
    type: Object,
    schema: {
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
          description: 'Email пользователя, должен быть уникальным',
        },
        password: {
          type: 'string',
          example: 'password123',
          description: 'Пароль пользователя',
        },
        firstName: {
          type: 'string',
          example: 'John',
          description: 'Имя пользователя',
        },
        lastName: {
          type: 'string',
          example: 'Doe',
          description: 'Фамилия пользователя',
        },
        age: {
          type: 'integer',
          example: 30,
          description: 'Возраст пользователя',
        },
        image: {
          type: 'string',
          example: 'https://example.com/avatar.jpg',
          description: 'Ссылка на изображение профиля пользователя',
        },
      },
    },
  })
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      age: number;
      image: string;
    },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Вход в систему пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Успешный вход',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          age: 30,
          image: 'https://example.com/avatar.jpg',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  @ApiBody({
    description: 'Данные для входа пользователя',
    type: Object,
    schema: {
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
          description: 'Email пользователя для входа',
        },
        password: {
          type: 'string',
          example: 'password123',
          description: 'Пароль пользователя для входа',
        },
      },
    },
  })
  async login(
    @Body()
    body: { email: string; password: string },
  ) {
    return this.authService.login(body.email, body.password);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Выход из системы' })
  @ApiResponse({ status: 200, description: 'Выход выполнен успешно' })
  @ApiResponse({ status: 401, description: 'Неавторизованный доступ' })
  async logout(@Req() req: any) {
    const userId = req.user.id;
    return this.authService.logout(userId);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Сброс пароля пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пароль успешно сброшен',
    schema: {
      example: {
        message: 'Password reset successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Сброс пароля невозможен' })
  async resetPassword(
    @Body()
    body: { email: string; newPassword: string },
  ) {
    return this.authService.resetPassword(body.email, body.newPassword);
  }
}
