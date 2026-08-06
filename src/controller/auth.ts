import {Controller, Request, Get, Post, UseGuards, Body} from '@nestjs/common';
import Public from "../decorator/public";
import AuthService from "../service/auth";
import {Login, Register} from "../validator/auth";

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() data: Login) {
    return this.authService.login(data);
  }
  @Public()
  @Post('register')
    register(@Body() data: Register) {
    return this.authService.register(data);
  }
}
