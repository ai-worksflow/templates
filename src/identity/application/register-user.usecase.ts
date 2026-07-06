import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { USER_REPOSITORY, UserRepository } from '../ports/user.repository';

export class UserAlreadyExistsError extends Error {}

export interface RegisterUserCommand {
  email: string;
  displayName: string;
}

export interface RegisterUserResult {
  userId: string;
  email: string;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly users: UserRepository) {}

  async execute(command: RegisterUserCommand): Promise<RegisterUserResult> {
    if (await this.users.findByEmail(command.email)) {
      throw new UserAlreadyExistsError('user already exists');
    }
    const user = User.register(command.email, command.displayName);
    await this.users.save(user);
    return { userId: user.id, email: user.email };
  }
}
