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

  @Column({ nullable: false, unique: true })
  login: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column()
  avatar: string;

  @Column({ length: 255 })
  bio: string;

  @ManyToMany(() => Channel)
  @JoinTable({ name: 'users_channels' })
  channel: Channel;
}
