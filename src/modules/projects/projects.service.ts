import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PaginationDto } from 'src/config/pagination.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    //check if PM is already assigned a project
    const { projectManagerId } = createProjectDto;
    if (projectManagerId) {
      const exist = await this.projectRepository.findOne({
        where: { projectManagerId: projectManagerId },
      });

      if (exist)
        throw new BadRequestException(
          'this project manager is already assigned to a project',
        );
    }
    const project = await this.projectRepository.save(createProjectDto);
    this.eventEmitter.emit('event', {
      event: 'project.created',
      data: project,
    });
    if (projectManagerId) {
      this.eventEmitter.emit('event', {
        event: 'project.projectManagerAssigned',
        data: `project manager with id ${projectManagerId} assigned to project with id ${project.id}`,
      });
    }
    return project;
  }

  async findAll(paginationDto: PaginationDto) {
    const qb = this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.projectManager', 'pm');

    qb.limit(paginationDto.limit).offset(
      (paginationDto.page - 1) * paginationDto.limit,
    );
    qb.orderBy(`p.${paginationDto.orderBy}`, paginationDto.order);
    const res = await qb.getManyAndCount();
    return { data: res[0], count: res[1] };
  }

  async findOne(id: number) {
    return await this.projectRepository.findOne({
      where: { id },
      relations: { tasks: true, projectManager: true },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { projectManagerId } = updateProjectDto;
    if (projectManagerId) {
      const exist = await this.projectRepository.findOne({
        where: { projectManagerId: projectManagerId },
      });
      if (exist)
        throw new BadRequestException(
          'this project manager is already assigned to a project',
        );
    }
    const res = await this.projectRepository.update({ id }, updateProjectDto);
    this.eventEmitter.emit('event', {
      event: 'project.updated',
      data: `project with id ${id} is updated`,
    });
    if (projectManagerId) {
      this.eventEmitter.emit('event', {
        event: 'project.projectManagerAssigned',
        data: `project manager with id ${projectManagerId} assigned to project with id ${id} `,
      });
    }
    return res;
  }

  async remove(id: number) {
    const res = await this.projectRepository.delete({ id });
    if (res.affected === 1) {
      this.eventEmitter.emit('event', {
        event: 'project.deleted',
        data: `project with id ${id} is deleted`,
      });
    }
    return res;
  }

  // This cron job will run every day at 7 AM
  @Cron('0 7 * * *')
  async projectEnd() {
    const currentDate = new Date();

    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .where('project.endDate < :currentDate', { currentDate })
      .andWhere('project.completed = :completed', { completed: false })
      .leftJoinAndSelect('project.tasks', 'tasks')
      .getMany();
      
    projects.forEach((project) => {
      this.projectRepository.update({ id: project.id }, { completed: true });
      let detail = project;
      delete detail.tasks,
        this.eventEmitter.emit('event', {
          event: 'project.end',
          data: detail,
        });
      this.eventEmitter.emit('event', {
        event: 'project.endSummary',
        data: project,
      });
    });
  }
}
