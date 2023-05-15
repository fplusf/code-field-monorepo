/* eslint-disable @nx/enforce-module-boundaries */
import { Folder } from '@rogor/api/folders';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, length: 5 })
  icon: string;

  @Column()
  content: string;

  @ManyToOne(() => Folder, (space) => space.documents, {
    cascade: true, // asotiate document to a folder when creating a new document
  })
  folderId: number;

  @Column({ nullable: true })
  shareableLink: string;

  @Column({ nullable: true })
  lastViewedAt: Date;

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
