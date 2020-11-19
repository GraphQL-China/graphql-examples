import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { BasicModule } from './basic/basic.module';

@Module({
  providers: [CoreService],
  exports: [CoreService],
  imports: [BasicModule],
})
export class CoreModule {}
