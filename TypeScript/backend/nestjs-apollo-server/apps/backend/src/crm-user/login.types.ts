import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseType {
  @Field()
  public accessToken: string;

  @Field()
  public tokenType: string;

  @Field()
  public expiresIn: string;
}
