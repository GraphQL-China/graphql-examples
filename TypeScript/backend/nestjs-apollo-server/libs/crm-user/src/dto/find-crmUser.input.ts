import { Field, InputType } from '@nestjs/graphql';
import { ConnectionFilterArgsType } from '@app/core/paginated';

@InputType()
export class FindCrmUserInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  status?: number;

  @Field({ nullable: true })
  email?: string;
}

@ConnectionFilterArgsType()
@InputType()
export class CrmUserFilter extends FindCrmUserInput {}
