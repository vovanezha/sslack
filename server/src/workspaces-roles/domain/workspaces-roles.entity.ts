import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WorkspacesRolesEnum } from './workspaces-roles.type';

@Entity()
export class WorkspacesRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: WorkspacesRolesEnum,
    unique: true,
  })
  name: WorkspacesRolesEnum;
}
