import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class UpdateCelebrityInput {
  @Field()
  id: number;

  @Field()
  @MaxLength(30)
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
}
