import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PaginationDto } from 'src/config/pagination.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private subscriptionsService: SubscriptionsService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectRepository.save(createProjectDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const qb = this.projectRepository
      .createQueryBuilder('p')
      .leftJoin('p.projectManager', 'pm');

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
    return await this.projectRepository.update({ id }, updateProjectDto);
  }

  async remove(id: number) {
    return await this.projectRepository.delete({ id });
  }
}
