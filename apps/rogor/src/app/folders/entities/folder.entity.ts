import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Space } from '../../spaces/entities/space.entity';

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  color: string;

  @Column({ nullable: true })
  deepLink: string;

  // TODO: figure how to set spaceId  as a foreign key while creating Folder table
  @ManyToMany(() => Space, (space) => space.folders)
  spaceId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;
}
