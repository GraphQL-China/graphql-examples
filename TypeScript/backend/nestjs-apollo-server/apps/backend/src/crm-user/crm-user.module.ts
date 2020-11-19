import { Module } from '@nestjs/common';
import { LibCrmUserModule } from '@app/crm-user';
import { CrmUserResolver } from './crm-user.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [LibCrmUserModule, AuthModule],
  providers: [CrmUserResolver],
})
export class CrmUserModule {}
