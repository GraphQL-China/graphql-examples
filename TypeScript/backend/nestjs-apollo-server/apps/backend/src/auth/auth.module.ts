import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthStrategy } from './auth.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmUserEntity } from '@app/crm-user/crm_user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CrmUserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [AuthService, AuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
