import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PaginationDto } from 'src/config/pagination.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private subscriptionsService: SubscriptionsService,
  ) {}

  async create(createProjectDto: CreateTaskDto) {
    return await this.taskRepository.save(createProjectDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const qb = this.taskRepository
      .createQueryBuilder('t');

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
    return await this.taskRepository.update({ id }, updateProjectDto);
  }

  async remove(id: number) {
    return await this.taskRepository.delete({ id });
  }
}
