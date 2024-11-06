import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), SubscriptionsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
