import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { Query } from '@nestjs/graphql';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { LoginResponseType } from './login.types';
import { CrmUserService } from '@app/crm-user';
import {
  CrmUser,
  CrmUserConnection,
} from '@app/crm-user/models/crm-user.model';
import { AuthService } from '../auth/auth.service';
import { JwtAuth } from '../guard/auth.guard';
import { CurrentCrmUser } from '../decorators/current-user.decorator';
import {
  CrmUserFilter,
  FindCrmUserInput,
} from '@app/crm-user/dto/find-crmUser.input';
import { NewCrmUserInput } from '@app/crm-user/dto/new-crmUser.input';
import { UpdateCrmUserInput } from '@app/crm-user/dto/update-crmUser.input';
import { CrmUserEntity } from '@app/crm-user/crm_user.entity';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { dissoc } from 'ramda';

@Resolver(CrmUser)
export class CrmUserResolver {
  constructor(
    private crmUserService: CrmUserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(new JwtAuth())
  @Query(() => [CrmUser], { nullable: true })
  CrmUser(
    @Args('searchCrmUser', { nullable: true }) args?: FindCrmUserInput,
  ): Observable<CrmUserEntity[]> {
    return this.crmUserService.find({ ...args });
  }

  @Query(() => LoginResponseType, { nullable: true })
  login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Observable<LoginResponseType> {
    return this.authService.login(email, password);
  }

  @UseGuards(new JwtAuth())
  @Query(() => CrmUser)
  currentCrmUserInfo(
    @CurrentCrmUser() user: CrmUser,
  ): Observable<CrmUserEntity> {
    const { id } = user;
    return this.crmUserService.findOne(id);
  }

  @UseGuards(new JwtAuth())
  @Query(() => CrmUser, { nullable: true })
  getCrmUserInfoById(@Args('id') id: number): Observable<CrmUser | undefined> {
    return this.crmUserService.findOne(id);
  }

  @UseGuards(new JwtAuth())
  @Mutation(() => CrmUser)
  addCrmUser(@Args('newCrmUser') newCrmUser: NewCrmUserInput) {
    const { password } = newCrmUser;

    return from(this.authService.hashPassword(password)).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.crmUserService.createOne<NewCrmUserInput>({
            ...newCrmUser,
            password: hashedPassword,
          }),
        );
      }),
    );
  }

  @UseGuards(new JwtAuth())
  @Mutation(() => Boolean)
  deleteCrmUser(@Args('id') id: number) {
    return this.crmUserService.removeOne(id);
  }

  @UseGuards(new JwtAuth())
  @Mutation(() => CrmUser)
  updateCrmUser(@Args('data') data: UpdateCrmUserInput) {
    const { id } = data;
    return this.crmUserService.findOne(id).pipe(
      switchMap((crmUser) => {
        if (!crmUser) throw new NotFoundException('crmUser not found');
        return this.crmUserService.updateOne(id, dissoc('id', data));
      }),
    );
  }

  @UseGuards(new JwtAuth())
  @Query(() => CrmUserConnection)
  listUsers(@Args('data') data: CrmUserFilter): Observable<CrmUserConnection> {
    return this.crmUserService.paginated(data);
  }
}
