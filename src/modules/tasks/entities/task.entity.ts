import { Status } from 'src/config/status.enum';
import { Project } from 'src/modules/projects/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updatedAt: Date;
}
