import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Space Entity - This entity is used to store the space information of the user.
 * This name also used in the database table name.
 */

@Entity('spaces') // alias name for the table
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.spaces)
  userId: number;

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
