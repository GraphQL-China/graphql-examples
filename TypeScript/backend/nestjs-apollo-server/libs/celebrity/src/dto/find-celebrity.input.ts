import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class FindCelebrityInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  chineseName?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  birthday?: string;

  @Field({ nullable: true })
  deathday?: string;

  @Field({ nullable: true })
  status?: number;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  limit?: number;
}
