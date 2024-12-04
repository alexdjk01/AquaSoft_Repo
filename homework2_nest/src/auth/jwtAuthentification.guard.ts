import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from '../constants.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization; //receives the token for authorization

    if (!authHeader) {  //if no token is provided
      return false;   //no token
    }

    const token = authHeader.split(' ')[1]; // Extracts the token
    try {
      const decoded = this.jwtService.verify(token, { secret: JWT_SECRET_KEY }); //if token matches the saved token
      request.user = decoded; // Attach user payload to request ( the request can be used in routes controllers for verifications,etc.)
      return true;    //token is ok
    } catch (error) {
      return false; //invalid token
    }
  }
}
