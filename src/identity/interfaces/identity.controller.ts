import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import {
  RegisterUserUseCase,
  UserAlreadyExistsError,
} from '../application/register-user.usecase';

interface RegisterUserBody {
  email: string;
  display_name: string;
}

@Controller()
export class IdentityController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Get('/healthz')
  health() {
    return { status: 'ok' };
  }

  @Post('/identity/users')
  async createUser(@Body() body: RegisterUserBody) {
    try {
      return await this.registerUser.execute({
        email: body.email,
        displayName: body.display_name,
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
}
