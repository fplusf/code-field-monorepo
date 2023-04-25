import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

// TODO: create events for all importants actions

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
