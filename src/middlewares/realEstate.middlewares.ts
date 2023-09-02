import "express-async-errors"
import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";
import { addressRepository } from "../repositories";
import { AddressCreate } from "../interfaces";

const addressExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const requestAddress: AddressCreate = req.body.address;
    
    if(!requestAddress){
        return next();
    };
    
    const foundAddress = await addressRepository.findOne({
        where: requestAddress
    });

    if (!foundAddress) {
        return next();
    } else {
        throw new AppError("Address already exists.", 409);
    };
};

export default { addressExists };