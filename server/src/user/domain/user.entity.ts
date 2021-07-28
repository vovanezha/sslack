import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Channel } from 'src/channel/domain/channel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 255 })
  firstName: string;

  @Column({ nullable: true, length: 255 })
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, length: 255 })
  bio: string;

  @ManyToMany(() => Channel)
  @JoinTable({ name: 'users_channels' })
  channel: Channel;
}
