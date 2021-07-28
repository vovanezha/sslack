import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspace } from 'src/workspace/domain/workspace.entity';
import { User } from 'src/user/domain/user.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ length: 5000 })
  description: string;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @ManyToMany(() => User)
  user: User;
}
