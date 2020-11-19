import { Test, TestingModule } from '@nestjs/testing';
import { BasicResolver } from './basic.resolver';

describe('BasicResolver', () => {
  let resolver: BasicResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicResolver],
    }).compile();

    resolver = module.get<BasicResolver>(BasicResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
