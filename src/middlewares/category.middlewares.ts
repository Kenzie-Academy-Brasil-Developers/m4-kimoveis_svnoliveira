import "express-async-errors"
import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";
import { categoryRepository } from "../repositories";

const nameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const requestName: string = req.body.name;
    
    if(!requestName){
        return next();
    };
    
    const foundName = await categoryRepository.findOne({
        where: {
            name: requestName
        }
    });

    if (!foundName) {
        return next();
    } else {
        throw new AppError("Category already exists.", 409);
    };
};

const idExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const idTarget = Number(req.body.categoryId) | Number(req.params.id);

    const category = await categoryRepository.findOne({
        where: {
            id: idTarget
        }
    });
    
    if (category) {
        return next();
    } else {
        throw new AppError("Category not found", 404);
    };
};
export default { nameExists, idExists };