import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

@Index(['name', 'type'])
@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('json')
  payload: Record<string, unknown>;
}
