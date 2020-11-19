import { Module } from '@nestjs/common';
import { CrmUserService } from './crm-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmUserEntity } from '@app/crm-user/crm_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrmUserEntity])],
  providers: [CrmUserService],
  exports: [CrmUserService],
})
export class LibCrmUserModule {}
