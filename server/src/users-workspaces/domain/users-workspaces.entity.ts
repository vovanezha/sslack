import { User } from 'src/user/domain/user.entity';
import { Workspace } from 'src/workspace/domain/workspace.entity';
import { WorkspacesRoles } from 'src/workspaces-roles/domain/workspaces-roles.entity';
import { WorkspacesRolesEnum } from 'src/workspaces-roles/domain/workspaces-roles.type';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersWorkspaces {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkspacesRoles, { nullable: false })
  role: WorkspacesRolesEnum;

  @ManyToOne(() => User, { nullable: false })
  userId: number;

  @ManyToOne(() => Workspace, { nullable: false })
  workspaceId: number;
}
