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
                id: decoded.id | Number(decoded.sub),
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

    const adminStatus: boolean | undefined = res.locals.tokenData.admin;
    const tokenId: number = res.locals.tokenData.id;
    const userId: number | null = res.locals.user? res.locals.user.id : null;

    if(!adminStatus){
        if(req.body){
            if(tokenId === userId){
                return next();
            }
            throw new AppError("Insufficient permission", 403);
        }  
        throw new AppError("Insufficient permission", 403);
    };
    return next();
};

export default { validate, isAuthorized };