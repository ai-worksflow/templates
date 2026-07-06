import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { UserRepository } from '../ports/user.repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, User>();

  async save(user: User): Promise<void> {
    this.users.set(user.email, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.get(email.trim().toLowerCase()) ?? null;
  }
}
