import "dotenv/config";
import "express-async-errors";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors";


const validate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authorization: string | undefined = req.headers.authorization;
    if (!authorization) {
        throw new AppError("Missing bearer token", 401);
    };

    const [_bearer, token] = authorization.split(" ");
    verify(
        token,
        String(process.env.SECRET_KEY),
        (error: any, decoded: any) => {
            if (error) {
                throw new AppError(error.message, 401);
            }
            res.locals.tokenData = {
                email: decoded.email,
                id: decoded.id,
                admin: decoded.admin
            };
        }
    );

    return next();
};

const isAuthorized = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    const adminStatus: boolean = res.locals.tokenData.admin;

    if(!adminStatus){
        if(
            req.body && res.locals.user && 
            res.locals.tokenData.id === res.locals.user.id){ 
            return next(); 
        };
        throw new AppError("Insufficient permission", 403);
    }
    return next();
};

export default { validate, isAuthorized };