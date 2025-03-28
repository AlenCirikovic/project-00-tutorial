import { IsNotEmpty, IsOptional, IsEmail, Matches } from 'class-validator'

export class CreateUserDto {
  @IsOptional()
  first_name?: string

  @IsOptional()
  last_name?: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  // role_id: string

  @IsNotEmpty()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
    message:
      'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters',
  })
  password: string

  @IsNotEmpty()
  @Matches(CreateUserDto, (field) => field.password, { message: 'Passwords do not match.' })
  confirm_password: string
}
