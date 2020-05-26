import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Story} from "../entity/story";
import {User} from "../entity/user";
const constants = require('../constants');
const isAdmin = require('../helper').isAdmin;
const isUser = require('../helper').isUser;

export class StoryController {
    
    static validateStory = (story : Story) => {
        if (!story) {
            throw new Error("No story found");
        }
        if (!story.summary) {
            throw new Error("Story summary missing");
        }
        if (!story.description) {
            throw new Error("Story description missing");
        }
        if (!story.complexity) {
            throw new Error("Story complexity missing");
        }
        if (constants.storyComplexity.indexOf(story.complexity) === -1) {
            throw new Error("Invalid complexity given")
        }
        if (!story.type) {
            throw new Error("Story type missing");
        }
        if (constants.storyTypes.indexOf(story.type) === -1) {
            throw new Error("Invalid story type given")
        }
        if (!story.estimatedHrs) {
            throw new Error("Effort estimate is missing");
        }
        if (!story.cost) {
            throw new Error("Cost missing");
        }
        if (!story.createdBy) {
            throw new Error("createdBy is missing");
        }
    };

    
    static create_story = async (request: Request , res: Response) => {
        
        try {
            const story = request.body;
            story.createdBy = request.user.id
            StoryController.validateStory(story);
            const storyRepository = getRepository(Story);
            res.json(await storyRepository.save(story))
        } catch (e) {
            res.status(400).json({"error": e.message});
        }
       
    }
    
    static list_stories = async (request: Request , res: Response) => {
        console.log('request.user.role')
        console.log(request.user.role)
        try {
            const storyRepository = getRepository(Story);
           if(isAdmin(request.user.role)){
               res.json(await storyRepository.find())
           }else if(isUser(request.user.role)){
               res.json(await storyRepository.find({createdBy : request.user.id}))
               //const userRepository = getRepository(User);
               //const user : User= await userRepository.findOne(request.user.id)
               //res.json(await user.stories)
           }else{
               throw new Error("Not a valid role");
           }
        } catch (e) {
            res.status(400).json({"error": e.message});
        }
       
    }
    
    static get_story = async (request: Request , res: Response) => {
        
        try {
            const storyRepository = getRepository(Story);
            const story = await storyRepository.findOne(request.params.id)
            
            if(story.createdBy !== request.user.id){
                throw new Error("You are not authorized to view this User Story");
            }
            res.json(story)
        } catch (e) {
            res.status(400).json({"error": e.message});
        }
       
    }
    
    static update_story = async (request: Request , res: Response) => {
        
        try {
           const storyRepository = getRepository(Story);
            let story = await storyRepository.findOne(request.body.id)
            //story.status = request.body.status
            
            Object.entries(request.body).map(([key, value]) => {
                if(key !== 'id'){
                    story[key] = value    
                }
            });
            StoryController.validateStory(story)
            
            res.json(await storyRepository.save(story))
            
        } catch (e) {
            res.status(400).json({"error": e.message});
        }
       
    }
}