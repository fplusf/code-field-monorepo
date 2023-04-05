import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Space } from '../../spaces/entities/space.entity';

export enum DefaultPrivacyLevel {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

/**
 * User entity class for the user table in the database. This class is used to define the
 * structure of the user table in the database. It is also used to define the structure of
 * the user objects that are returned by the API. The @Entity() decorator is used to
 * define the table name in the database. The @PrimaryGeneratedColumn() decorator is used
 * to define the primary key column in the database. The @Column() decorator is used to
 * define the other columns in the database.
 */

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  uuid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  avatar: string;

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
