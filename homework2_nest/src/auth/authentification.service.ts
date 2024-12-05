import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_USERNAME, JWT_PASSWORDE } from '../constants.js';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(username: string, password: string) {
    if (username === JWT_USERNAME && password === JWT_PASSWORDE) { //only if username and password match
      const value = { username };
      return {
        access_token: this.jwtService.sign(value),
      };
    }
    throw new Error('Wrong credentials! Try again please!');
  }
}
