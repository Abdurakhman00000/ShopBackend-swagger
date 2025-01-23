import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает информацию о пользователе',
    schema: {
      example: {
        id: 1,
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        image: 'https://example.com/avatar.jpg',
        createdAt: '2025-01-20T12:34:56.789Z',
        updatedAt: '2025-01-20T12:34:56.789Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  async getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
}
