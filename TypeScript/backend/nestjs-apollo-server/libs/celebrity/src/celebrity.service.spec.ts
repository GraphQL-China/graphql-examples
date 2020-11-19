import { Test, TestingModule } from '@nestjs/testing';
import { CelebrityService } from './celebrity.service';

describe('CelebrityService', () => {
  let service: CelebrityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CelebrityService],
    }).compile();

    service = module.get<CelebrityService>(CelebrityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
