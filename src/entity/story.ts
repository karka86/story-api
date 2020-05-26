import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./user";

export enum Type {
    ENHANCEMENT = "enhancement",
    BUGFIX = "bugfix",
    DEVELOPMENT = "development",
    QA = "qa",
    
}

export enum Complexity {
    LOW = "low",
    MID = "mid",
    HIGH = 'high'
}

@Entity()
export class Story {

    @PrimaryGeneratedColumn()
    id: number;

   @Column("varchar", { length: 128 })
    summary: string;

   @Column("varchar", { length: 512 })
    description: string;
 
    @Column({type: "enum", enum: Type})
    type: Type
    
  
    @Column({type: "enum", enum: Complexity})
    complexity: Complexity;
    
    @Column()
    estimatedHrs: number;
    
    @Column()
    cost: number;
    
    @ManyToOne(type => User, user => user.stories)
    createdBy: User;
    
    
    @Column({default : "new"})
    status: string;

}