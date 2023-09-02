import { Request, Response } from "express";
import { RealEstateWithAddress } from "../interfaces";
import { realEstateServices } from "../services";


const create = async ( req: Request, res: Response ): Promise<Response> => {
    const realEstate: RealEstateWithAddress = await realEstateServices.create(req.body);
    return res.status(201).json(realEstate);
};

export default { create };