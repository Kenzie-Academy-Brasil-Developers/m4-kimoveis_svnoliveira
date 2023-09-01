import { Request, Response } from "express";
import { userServices } from "../services";
import { UserList, UserReturn } from "../interfaces";

const create = async ( req: Request, res: Response ): Promise<Response> => {
    const user: UserReturn = await userServices.create(req.body);

    return res.status(201).json(user);
};

const read = async ( req: Request, res: Response ): Promise<Response> => {
    const userList: UserList = await userServices.read();
    return res.status(200).json(userList);
};

const update = async ( req: Request, res: Response ): Promise<Response> => {
    const user: UserReturn = await userServices.update(req.body, res.locals.user);
    return res.status(200).json(user);
};

const destroy = async ( req: Request, res: Response ): Promise<Response> => {
    await userServices.destroy(res.locals.user);
    return res.status(204).send();
};

export default { create, read, update, destroy };