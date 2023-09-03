import { Request, Response } from "express";
import { realEstateServices } from "../services";
import { Category, RealEstate } from "../entities";
import { RealEstateList } from "../interfaces";


const create = async ( req: Request, res: Response ): Promise<Response> => {
    const category: Category = res.locals.category;
    const realEstate: RealEstate = await realEstateServices.create(req.body, category);
    return res.status(201).json(realEstate);
};

const read = async ( req: Request, res: Response ): Promise<Response> => {
    const realEstateList: RealEstateList = await realEstateServices.read();
    return res.status(200).json(realEstateList);
}
export default { create, read };