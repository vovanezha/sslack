import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'sslack',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      entities: [
        join(__dirname, './**/*.entity.{ts,js}'),
        // join(__dirname, 'dist/**/*.entity.{ts,js}'),
      ],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
