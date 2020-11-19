import { Module } from '@nestjs/common';
import { LibCelebrityModule } from '@app/celebrity';
import { AuthModule } from '../auth/auth.module';
import { CelebrityResolver } from './celebrity.resolver';

@Module({
  imports: [LibCelebrityModule, AuthModule],
  providers: [CelebrityResolver],
})
export class CelebrityModule {}
