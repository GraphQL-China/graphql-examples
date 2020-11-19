import { Module } from '@nestjs/common';
import { BasicService } from './basic.service';

@Module({
  providers: [BasicService],
})
export class BasicModule {}
