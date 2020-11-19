import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('crm_user')
export class CrmUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Index({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
