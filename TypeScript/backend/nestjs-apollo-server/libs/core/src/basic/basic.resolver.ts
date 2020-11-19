import { Resolver } from '@nestjs/graphql';
import { BasicService } from '@app/core/basic/basic.service';

@Resolver('Basic')
export class BasicResolver<S> {
  protected constructor(protected service: BasicService<S>) {}
}
