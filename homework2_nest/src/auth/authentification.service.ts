import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    if (username === 'alex' && password === 'alex1234') { //only if username and password match
      const payload = { username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }
}
