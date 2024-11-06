import { Injectable } from '@nestjs/common';
import { CreateProjectManagerDto } from './dto/create-project-manager.dto';
import { UpdateProjectManagerDto } from './dto/update-project-manager.dto';
import { ProjectManager } from './entities/project-manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectManagersService {
  constructor(
    @InjectRepository(ProjectManager)
    private projectMangerRepository: Repository<ProjectManager>,
  ) {}

  create(createProjectManagerDto: CreateProjectManagerDto) {
    return 'This action adds a new projectManager';
  }

  findAll() {
    return `This action returns all projectManagers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectManager`;
  }

  update(id: number, updateProjectManagerDto: UpdateProjectManagerDto) {
    return `This action updates a #${id} projectManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectManager`;
  }
}
