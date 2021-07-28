export class CreateUserDto {
  login: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
