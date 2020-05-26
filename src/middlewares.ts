const constants = require('./constants')
import {NextFunction, Request, Response} from "express";
const decode = require('./auth_helper').decode


const authenticate = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (token) {
        try {
          
            req.user = decode(token);
            
            return next();
        } catch (e) {
            console.log(`Error in authorization ${e}`)
        }
    }
    res.sendStatus(401);
};



const checkRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (token) {
        try {
          
            req.user = decode(token);
            if(req.user.role === role){
                return next();    
            }
            
        } catch (e) {
            console.log(`Error in authorization ${e}`)
        }
    }
    res.sendStatus(401);
  };
};
module.exports = {authenticate, checkRole};