import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsEmail, Matches, IsMobilePhone } from 'class-validator';

@InputType()
export class NewCrmUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @IsMobilePhone('zh-CN')
  phone: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/)
  password: string;
}
