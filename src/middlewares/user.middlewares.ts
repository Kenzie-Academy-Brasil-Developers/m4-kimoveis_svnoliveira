import "express-async-errors"
import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";
import { userRepository } from "../repositories";

const emailExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const requestEmail: string = req.body.email;
    
    if(!requestEmail){
        return next();
    };
    
    const foundEmail = await userRepository.findOne({
        where: {
            email: requestEmail
        }
    });

    if (!foundEmail) {
        return next();
    } else {
        throw new AppError("Email already exists.", 409);
    };
};

export default { emailExists };