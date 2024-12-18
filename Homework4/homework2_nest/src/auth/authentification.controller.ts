import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './authentification.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('getToken')
  getToken(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.getToken(username, password);
  }
}
