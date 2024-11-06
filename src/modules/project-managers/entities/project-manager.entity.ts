import { Project } from "src/modules/projects/entities/project.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('project_manager')
export class ProjectManager {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @OneToOne(() => Project, (project) => project.projectManager)
    project: Project;

    @CreateDateColumn({ nullable: true, type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
    updatedAt: Date;
}
