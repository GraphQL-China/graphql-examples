import { Module } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { CrmUserModule } from './crm-user/crm-user.module';
import { CelebrityModule } from './celebrity/celebrity.module';

@Module({
  imports: [CommonModule, CrmUserModule, CelebrityModule],
})
export class AppModule {}
