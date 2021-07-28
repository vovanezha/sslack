import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'message_files' })
export class MessageFiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  url: string;
}
