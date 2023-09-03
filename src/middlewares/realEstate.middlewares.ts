import "express-async-errors"
import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";
import { addressRepository, realEstateRepository } from "../repositories";
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
        throw new AppError("Address already exists", 409);
    };
};

const idExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const idTarget = Number(req.body.realEstateId) | Number(req.params.id);

    const realEstate = await realEstateRepository.findOne({
        where: {
            id: idTarget
        },
        relations: {
            address: true,
            category: true
        }
    });
    
    if (realEstate) {
        res.locals.realEstate = realEstate;
        return next();
    } else {
        throw new AppError("RealEstate not found", 404);
    };
};

export default { addressExists, idExists };