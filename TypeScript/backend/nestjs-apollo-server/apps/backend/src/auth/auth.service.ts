import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, hash, genSaltSync } from 'bcrypt';
import { authPayload } from './auth.types';
import { CrmUserEntity } from '@app/crm-user/crm_user.entity';
import { LoginResponseType } from '../crm-user/login.types';
import { CrmUser } from '@app/crm-user/models/crm-user.model';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(CrmUserEntity)
    private crmUsersRepository: Repository<CrmUserEntity>,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  public login(email: string, password: string): Observable<LoginResponseType> {
    return from(this.crmUsersRepository.findOne({ email })).pipe(
      switchMap((crmUser) => {
        if (!crmUser) {
          throw new BadRequestException('用户名或者密码不正确');
        }
        const { password: crmUserPassword } = crmUser;
        return from(this.comparePasswords(password, crmUserPassword)).pipe(
          map((match: boolean) => {
            if (match) {
              const { id, email } = crmUser;
              return {
                accessToken: this.jwtService.sign(
                  {
                    email: email,
                    crmUserId: id.toString(),
                  },
                  {
                    issuer: 'wisdom',
                    jwtid: id.toString(),
                  },
                ),
                tokenType: 'bearer',
                expiresIn: '7d',
              };
            }
            throw new BadRequestException('用户名或者密码不正确');
          }),
        );
      }),
    );
  }

  hashPassword(password: string): Observable<string> {
    const salt = genSaltSync();
    return from<string>(hash(password, salt));
  }

  comparePasswords(
    newPassword: string,
    hashedPassword: string,
  ): Observable<any> {
    return from(compare(newPassword, hashedPassword));
  }

  public validateUser(payload: authPayload): Observable<CrmUser> {
    const { email } = payload;
    return from(this.crmUsersRepository.findOne({ email }));
  }
}
