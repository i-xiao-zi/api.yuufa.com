import {IsString, Length} from "class-validator";

export class Login {
  @IsString()
  @Length(2, 50, { message: '用户名长度必须在2-50个字符之间' })
  name: string;

  @IsString()
  @Length(8, 32, {message: '密码长度必须在8-32个字符之间'})
  password: string;
}
export class Register {
  @IsString()
  @Length(2, 50, { message: '用户名长度必须在2-50个字符之间' })
  name: string;

  @IsString()
  @Length(8, 32, {message: '密码长度必须在8-32个字符之间'})
  password: string;
}