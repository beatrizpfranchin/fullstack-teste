import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false
    }), //Modulo do Passport que ajuda a gerenciar as credenciais para realizar login
    JwtModule.register({
      secret: process.env.REACT_APP_JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }), //Modulo JWT para gerenciar autenticação. Recebe o segredo que está na variável .env
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
