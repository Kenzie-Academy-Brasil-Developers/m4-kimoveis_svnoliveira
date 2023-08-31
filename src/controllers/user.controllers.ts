import { Request, Response } from "express";
import { userServices } from "../services";
import { UserReturn } from "../interfaces";

const create = async ( req: Request, res: Response ): Promise<Response> => {
    const user: UserReturn = await userServices.create(req.body);

    return res.status(201).json(user);
};

export default { create };