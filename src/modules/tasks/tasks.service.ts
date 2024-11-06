import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PaginationDto } from 'src/config/pagination.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Status } from 'src/config/status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createProjectDto: CreateTaskDto) {
    const task = await this.taskRepository.save(createProjectDto);
    this.eventEmitter.emit('event', { event: 'task.created', data: task });
    return task;
  }

  async findAll(updateProjectDto: UpdateTaskDto, paginationDto: PaginationDto) {
    const qb = this.taskRepository.createQueryBuilder('t');
    qb.where(updateProjectDto)
    qb.limit(paginationDto.limit).offset(
      (paginationDto.page - 1) * paginationDto.limit,
    );
    qb.orderBy(`t.${paginationDto.orderBy}`, paginationDto.order);
    const res = await qb.getManyAndCount();
    return { data: res[0], count: res[1] };
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
      relations: { project: true },
    });
  }

  async update(id: number, updateProjectDto: UpdateTaskDto) {
    const res = await this.taskRepository.update({ id }, updateProjectDto);
    this.eventEmitter.emit('event', {
      event: 'task.updated',
      data: `task with id ${id} is updated`,
    });
    const { status } = updateProjectDto;
    if (status) {
      this.eventEmitter.emit('event', {
        event: `task.${status}`,
        data: `status of task with id ${id} is changed to ${status}`,
      });
    }
    return res;
  }

  async remove(id: number) {
    const res = await this.taskRepository.delete({ id });
    if (res.affected === 1) {
      const find = await this.findOne(id);
      this.eventEmitter.emit('event', {
        event: 'task.deleted',
        data: `task with id ${id} is deleted from project with id ${find.projectId}`,
      });
    }
    return res;
  }
}
