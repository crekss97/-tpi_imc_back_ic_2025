type UserWithoutPassword = Omit<UserEntity, 'password'>;

export class UserEntity implements UserWithoutPassword {
  id: number;
  email: string;
  name: string;
  surname: string;
  createdAt: Date;
}
