import { ProjectManager } from "src/modules/project-managers/entities/project-manager.entity";
import { Task } from "src/modules/tasks/entities/task.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column('text')
    details: string;

    @Column({ type: 'date', nullable: true })
    startDate: Date;
  
    @Column({ type: 'date', nullable: true })
    endDate: Date;

    //link between project and task
    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];

    @Column({nullable:true})
    projectManagerId: number;

    @OneToOne(() => ProjectManager, (pm) => pm.project)
    @JoinColumn({ name: 'projectManagerId' })
    projectManager: ProjectManager;

    @CreateDateColumn({ nullable: true, type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
    updatedAt: Date;

}
