import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Story} from "./story";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: "enum", enum: UserRole,default: UserRole.USER})
    role: UserRole
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;
    
    @OneToMany(type => Story, story => story.createdBy) 
    stories: Story[];

}


/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string    
 *        example:
 *           firstName: Sateesh
 *           lastName: Kumar
 *           email: sateesh@email.com
 */