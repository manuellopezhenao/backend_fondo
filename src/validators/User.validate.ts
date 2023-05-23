import { IsString, Length } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  @Length(3, 30)
  username: string;

  @IsString()
  @Length(6, 30)
  password: string;
}
