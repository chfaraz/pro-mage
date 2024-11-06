import { ProjectManager } from "src/modules/project-managers/entities/project-manager.entity";
import { Task } from "src/modules/tasks/entities/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column('text')
    details: string;

    @Column()
    manager: string; //enum or read it from db or json

    @Column({ type: 'date', nullable: true })
    startDate: Date;
  
    @Column({ type: 'date', nullable: true })
    endDate: Date;

    //link between project and task
    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];

    @OneToMany(() => ProjectManager, (pm) => pm.project)
    projectManagers: ProjectManager[];

    @CreateDateColumn({ nullable: true, type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
    updatedAt: Date;

}
