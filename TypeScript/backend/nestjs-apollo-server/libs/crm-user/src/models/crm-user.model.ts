import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  ConnectionEdgeObjectType,
  ConnectionObjectType,
} from '@app/core/paginated';

@ObjectType()
export class CrmUser {
  @Field(() => ID)
  id?: number;

  @Field()
  name?: string;

  @Field()
  phone?: string;

  @Field()
  email?: string;

  @Field()
  status?: number;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

@ConnectionEdgeObjectType(CrmUser)
export class CrmUserEdge {}

@ConnectionObjectType(CrmUserEdge, CrmUser)
export class CrmUserConnection {}
