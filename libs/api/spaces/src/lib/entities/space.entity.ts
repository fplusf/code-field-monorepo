/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { User } from '@rogor/api/auth';
import { Folder } from '@rogor/api/folders';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Space entity can be created for an existing user. It is used to group folders
 * together.
 */
@Entity('spaces') // alias name for the table
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.spaces)
  userId: number;

  @JoinTable()
  @ManyToMany(() => Folder, (folder) => folder.spaceId)
  folders: Folder[];

  @Column()
  spaceName: string;

  @Column({ nullable: true })
  avatar: string;

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
