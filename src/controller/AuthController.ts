import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/user";
const token = require('../auth_helper').token;
const decode = require('../auth_helper').decode;

const is_email = require('../helper').is_email;
export class AuthController {
    private userRepository = getRepository(User);
    
    
    static validateuser = (user) => {
       
        if (!is_email(user.email)) {
            throw new Error("Invalid Email ID");
        }
        if (!user.firstName) {
            throw new Error("Please enter First Name");
        }
        if (!user.lastName) {
            throw new Error("Please enter Last Name");
        }
        if (!user.password) {
            throw new Error("Please enter Password");
        }
       
    }
    static register = async (request: Request , res: Response) => {
        
        try {
            const user = request.body
            const userRepository = getRepository(User);
            AuthController.validateuser(user);
            
            res.json(await userRepository.save(user))
        } catch (e) {
            res.status(400).json({"error": e.message});
        }
       
    }
    
    
     static auth_user = async (request: Request , res: Response) => {
        
        try {
            console.log('request')
            console.log(request.body)
            const userRepository = getRepository(User);
            const email = request.body.email
            const password = request.body.password
            const role = request.body.isAdmin === true ? "admin" : "user"
            const user : User = await userRepository.findOne({email : email, password: password});
            if(!user){
                throw new Error("Please check your credentials");
            }
            if(user.role !== role){
                throw new Error("You do not have a '" + role + "' role");
            }
            console.log('user')
            console.log(user)
            const payload = {id : user.id, firstName : user.firstName, lastName : user.lastName, role : user.role}
            await res.json({token: token(payload), ...payload})
            
        } catch (e) {
            res.status(400).json({"error": e.message});
        }
       
    }
    
    
     
    static me = async (request: Request , res: Response) => {
        
        try {
            let token = request.headers.authorization;
            let user = null
            if (token) {
                user = decode(token);
            }else{
                throw new Error("Unable to identify you without token");
            }
            await res.json(user)
            
        } catch (e) {
            res.status(400).json({"error": e.message});
        }
       
    }
    
/*
    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }*/

}