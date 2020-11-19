import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, Length, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UpdateCrmUserInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(11)
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  password?: string;

  @Field({ nullable: true })
  status?: number;
}
