import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { authPayload } from './auth.types';
import { CrmUser } from '@app/crm-user/models/crm-user.model';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  public validate(payload: authPayload): Observable<CrmUser> {
    return from(this.authService.validateUser(payload)).pipe(
      map((crmUser) => {
        if (!crmUser) {
          throw new UnauthorizedException();
        }
        return crmUser;
      }),
    );
  }
}
