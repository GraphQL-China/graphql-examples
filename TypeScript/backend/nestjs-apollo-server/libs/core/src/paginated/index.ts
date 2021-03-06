import {
  ObjectType,
  Field,
  registerEnumType,
  Int,
  ReturnTypeFuncValue,
  InputType,
} from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

type Constructor = { new (...args: any[]): any };
@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  startCursor: string;

  @Field({ nullable: true })
  endCursor: string;

  @Field()
  hasPreviousPage: boolean;

  @Field()
  hasNextPage: boolean;
}

enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}
registerEnumType(Direction, { name: 'Direction' });

export function ConnectionFilterArgsType<T extends Constructor>() {
  return (target: T): Constructor => {
    @InputType()
    class ConnectionFilterArgsType extends target {
      @Field(() => Int, { nullable: true })
      @IsOptional()
      @Max(100)
      @Min(0)
      first!: number;

      @Field({ nullable: true })
      after: string;

      @Field(() => Int, { nullable: true })
      @IsOptional()
      @Max(100)
      @Min(0)
      last!: number;

      @Field({ nullable: true })
      before: string;
    }

    return ConnectionFilterArgsType;
  };
}

export function ConnectionOrderingInputType<T extends Constructor>() {
  return (target: T): Constructor => {
    @InputType(target.name)
    class ConnectionOrderingInputType extends target {
      @Field(() => Direction, { defaultValue: Direction.ASC })
      direction: Direction;
    }

    return ConnectionOrderingInputType;
  };
}

export function ConnectionEdgeObjectType<
  T extends Constructor,
  V extends ReturnTypeFuncValue
>(nodeType: V) {
  return (target: T): Constructor => {
    @ObjectType(target.name)
    class ConnectionEdgeObjectType extends target {
      @Field(() => nodeType)
      node: V;

      @Field()
      cursor: string;
    }

    return ConnectionEdgeObjectType;
  };
}

export function ConnectionObjectType<
  T extends Constructor,
  V extends ReturnTypeFuncValue,
  N extends ReturnTypeFuncValue
>(edgeType: V, nodeType: N) {
  return (target: T): Constructor => {
    @ObjectType(target.name)
    class ConnectionObjectType extends target {
      @Field(() => PageInfo)
      pageInfo: PageInfo;

      @Field(() => [edgeType])
      edges: V[];

      @Field(() => [nodeType])
      nodes: N[];
    }

    return ConnectionObjectType;
  };
}
