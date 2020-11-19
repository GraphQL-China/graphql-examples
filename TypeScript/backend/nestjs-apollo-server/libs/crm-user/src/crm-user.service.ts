import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrmUserEntity } from '@app/crm-user/crm_user.entity';
import { Repository } from 'typeorm';
import { BasicService } from '@app/core/basic/basic.service';

@Injectable()
export class CrmUserService extends BasicService<CrmUserEntity> {
  constructor(
    @InjectRepository(CrmUserEntity)
    protected readonly repository: Repository<CrmUserEntity>,
  ) {
    super(repository);
  }
}
