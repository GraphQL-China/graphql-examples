import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { JwtAuth } from '../guard/auth.guard';
import { Celebrity } from '@app/celebrity/models/celebrity.model';
import { CelebrityService } from '@app/celebrity';
import { FindCelebrityInput } from '@app/celebrity/dto/find-celebrity.input';
import { NewCelebrityInput } from '@app/celebrity/dto/new-celebrity.input';
import { UpdateCelebrityInput } from '@app/celebrity/dto/update-celebrity.input';

@UseGuards(new JwtAuth())
@Resolver(Celebrity)
export class CelebrityResolver {
  constructor(private celebrityService: CelebrityService) {}

  @Query(() => [Celebrity], { nullable: true })
  async celebrity(
    @Args('searchCelebrity', { nullable: true }) args?: FindCelebrityInput,
  ): Promise<Celebrity[]> {
    return await this.celebrityService.find({ ...args });
  }

  @Query(() => Celebrity)
  async getCelebrityById(
    @Args('id') id: string,
  ): Promise<Celebrity | undefined> {
    return this.celebrityService.findOne({ id: Number(id) });
  }

  @Mutation(() => Celebrity)
  async addCelebrity(
    @Args('args') args: NewCelebrityInput,
  ): Promise<Celebrity> {
    return await this.celebrityService.create({
      ...args,
    });
  }

  @Mutation(() => Boolean)
  async deleteCelebrity(@Args('id') id: string): Promise<boolean> {
    const crmUser = await this.celebrityService.findOne({ id: Number(id) });
    if (!crmUser) throw new NotFoundException('crmUser not found');
    await this.celebrityService.remove(id);
    return true;
  }

  @Mutation(() => Boolean)
  async updateCelebrity(
    @Args('data') data: UpdateCelebrityInput,
  ): Promise<boolean> {
    const { id } = data;
    delete data.id;
    const celebrity = await this.celebrityService.findOne({ id: Number(id) });
    if (!celebrity) throw new NotFoundException('celebrity not found');
    await this.celebrityService.update(id.toString(), data);
    return true;
  }
}
