import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('subscription')
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    callbackUrl:string;
    
    @Column()
    event:string;
}
