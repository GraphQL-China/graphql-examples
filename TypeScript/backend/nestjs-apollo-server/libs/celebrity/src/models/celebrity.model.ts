import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Celebrity {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  chineseName: string;

  @Field()
  country: string;

  @Field()
  birthday: string;

  @Field()
  deathday: string;

  @Field()
  status: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
