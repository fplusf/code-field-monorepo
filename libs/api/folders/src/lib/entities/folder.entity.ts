/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Document } from '@rogor/api/documents';
import { Space } from '@rogor/api/spaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  /**
   * Deep link can be used to link to a specific folder in the app
   * @example /folder/1 will link to the folder with id 1
   */
  @Column({ nullable: true })
  deepLink: string;

  @ManyToMany(() => Space, (space) => space.folders, {
    cascade: true, // add folder to a space when creating a new folder
  })
  spaceId: number;

  @JoinTable()
  @OneToMany(() => Document, (document) => document.folderId)
  documents: Document[];

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
