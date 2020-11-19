import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewCelebrityInput } from './dto/new-celebrity.input';
import { FindCelebrityInput } from './dto/find-celebrity.input';
import { UpdateCelebrityInput } from './dto/update-celebrity.input';
import { Celebrity } from './models/celebrity.model';
import { CelebrityEntity } from '@app/celebrity/celebrity.entity';

@Injectable()
export class CelebrityService {
  constructor(
    @InjectRepository(CelebrityEntity)
    private celebrityRepository: Repository<CelebrityEntity>,
  ) {}

  async findAll(): Promise<CelebrityEntity[]> {
    return this.celebrityRepository.find();
  }
  async findOne(arg: FindCelebrityInput): Promise<CelebrityEntity> {
    return this.celebrityRepository.findOne(arg);
  }

  async find(arg: FindCelebrityInput): Promise<CelebrityEntity[]> {
    return this.celebrityRepository.find({ ...arg });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.celebrityRepository.delete(id);
  }

  async create(data: NewCelebrityInput): Promise<Celebrity> {
    const crmUser = this.celebrityRepository.create({ ...data, status: 1 });
    return await this.celebrityRepository.save(crmUser);
  }

  async update(id: string, data: UpdateCelebrityInput): Promise<UpdateResult> {
    return await this.celebrityRepository.update(Number(id), { ...data });
  }
}
