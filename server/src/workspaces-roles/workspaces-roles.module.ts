import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspacesRoles } from './domain/workspaces-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspacesRoles])],
  providers: [],
  controllers: [],
  exports: [],
})
export class WorkspacesRolesModule {}
