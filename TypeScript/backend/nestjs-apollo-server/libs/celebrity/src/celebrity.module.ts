import { Module } from '@nestjs/common';
import { CelebrityService } from './celebrity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelebrityEntity } from '@app/celebrity/celebrity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CelebrityEntity])],
  providers: [CelebrityService],
  exports: [CelebrityService],
})
export class LibCelebrityModule {}
