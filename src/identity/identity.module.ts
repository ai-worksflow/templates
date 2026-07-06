import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './application/register-user.usecase';
import { InMemoryUserRepository } from './infrastructure/in-memory-user.repository';
import { IdentityController } from './interfaces/identity.controller';
import { USER_REPOSITORY } from './ports/user.repository';

@Module({
  controllers: [IdentityController],
  providers: [
    RegisterUserUseCase,
    { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
  ],
})
export class IdentityModule {}
