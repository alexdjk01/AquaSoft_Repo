import { Module } from '@nestjs/common';
import { AuthController } from './authentification.controller';
import { AuthService } from './authentification.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'encodingKeyAlex', 
      signOptions: { expiresIn: '1h' }, // expires in 1h after creation
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], 
  exports: [AuthService, JwtModule], 
})
export class AuthModule {}
