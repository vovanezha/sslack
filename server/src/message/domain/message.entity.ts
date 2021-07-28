import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MessageFiles } from './files.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @OneToMany(() => MessageFiles, (message) => message)
  files: MessageFiles[];
}
