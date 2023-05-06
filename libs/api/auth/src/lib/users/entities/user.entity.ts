/* eslint-disable @nx/enforce-module-boundaries */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum, RoleType } from '../enums/roles';
import { Space } from '@rogor/api/spaces';

export enum DefaultPrivacyLevel {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

/**
 * User entity class for the user table in the database. This class is used to define the
 * structure of the user table in the database. It is also used to define the structure of
 * the user objects that are returned by the API for admin role.
 */

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: RoleEnum.Regular, type: 'enum', enum: RoleEnum })
  roles: RoleType[];

  @JoinColumn()
  @OneToMany(() => Space, (space) => space.userId)
  spaces: Space[];

  @Column('enum', {
    enum: DefaultPrivacyLevel,
    default: DefaultPrivacyLevel.PRIVATE,
  })
  defaultPrivacyLevel: DefaultPrivacyLevel;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
