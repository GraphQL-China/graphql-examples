import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuth extends AuthGuard('jwt') implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  public handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException('当前用户未登陆');
    }
    return user;
  }

  public getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    return context.switchToHttp().getRequest() || ctx.getContext().req;
  }
}
