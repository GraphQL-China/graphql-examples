import { Test, TestingModule } from '@nestjs/testing';
import { CrmUserService } from './crm-user.service';

describe('CrmUserService', () => {
  let service: CrmUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrmUserService],
    }).compile();

    service = module.get<CrmUserService>(CrmUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
