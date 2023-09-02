import { Request, Response } from "express";
import { Category } from "../entities";
import { categoryServices } from "../services";
import { CategoryList, RealEstateList } from "../interfaces";


const create = async ( req: Request, res: Response ): Promise<Response> => {
    const category: Category = await categoryServices.create(req.body);

    return res.status(201).json(category);
};

const read = async ( req: Request, res: Response ): Promise<Response> => {
    const categoryList: CategoryList = await categoryServices.read();

    return res.status(200).json(categoryList);
};

const readRealEstates = async ( req: Request, res: Response ): Promise<Response> => {
    const categoryId: number = Number(req.params.id);
    const realEstateList: RealEstateList = await categoryServices.readRealEstates(categoryId);

    return res.status(200).json(realEstateList);
};

export default { create, read, readRealEstates };