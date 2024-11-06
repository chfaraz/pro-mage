import { Injectable } from '@nestjs/common';
import { CreateProjectManagerDto } from './dto/create-project-manager.dto';
import { UpdateProjectManagerDto } from './dto/update-project-manager.dto';
import { ProjectManager } from './entities/project-manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/config/pagination.dto';

@Injectable()
export class ProjectManagersService {
  constructor(
    @InjectRepository(ProjectManager)
    private projectMangerRepository: Repository<ProjectManager>,
  ) {}

  async create(createProjectDto: CreateProjectManagerDto) {
    return await this.projectMangerRepository.save(createProjectDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const qb = this.projectMangerRepository
      .createQueryBuilder('pm');

    qb.limit(paginationDto.limit).offset(
      (paginationDto.page - 1) * paginationDto.limit,
    );
    qb.orderBy(`pm.${paginationDto.orderBy}`, paginationDto.order);
    const res = await qb.getManyAndCount();
    return { data: res[0], count: res[1] };
  }

  async findOne(id: number) {
    return await this.projectMangerRepository.findOne({
      where: { id },
      relations: { project: true },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectManagerDto) {
    return await this.projectMangerRepository.update({ id }, updateProjectDto);
  }

  async remove(id: number) {
    return await this.projectMangerRepository.delete({ id });
  }
}
