import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewCelebrityInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  chineseName?: string;

  @Field()
  country: string;

  @Field()
  birthday: string;

  @Field()
  deathday: string;

  @Field()
  status: number;
}
