import { Module } from '@nestjs/common';
import { AuthController } from './authentification.controller.js';
import { AuthService } from './authentification.service.js';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from '../constants.js';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET_KEY, 
      signOptions: { expiresIn: 600 }, //600 seconds or 10 minutes.
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], 
  exports: [AuthService, JwtModule], 
})
export class AuthModule {}
