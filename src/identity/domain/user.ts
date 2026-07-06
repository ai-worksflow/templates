export class InvalidUserError extends Error {}

export class User {
  private constructor(
    readonly id: string,
    readonly email: string,
    readonly displayName: string,
    readonly createdAt: Date,
  ) {}

  static register(email: string, displayName: string): User {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = displayName.trim();
    if (!normalizedEmail.includes('@') || normalizedName.length === 0) {
      throw new InvalidUserError('invalid user');
    }
    return new User(`usr_${Date.now()}`, normalizedEmail, normalizedName, new Date());
  }
}
