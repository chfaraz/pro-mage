import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { ProjectManagersModule } from './modules/project-managers/project-managers.module';
import { ConfigModule } from '@nestjs/config';
import typeorm, { connectionSource } from './config/database';


@Module({
  imports: [
    TypeOrmModule.forRoot(connectionSource.options),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    ProjectsModule, TasksModule, SubscriptionsModule, ProjectManagersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
