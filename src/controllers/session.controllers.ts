import { Request, Response } from "express";
import { Token } from "../interfaces";
import { sessionServices } from "../services";

const login = async ( req: Request, res: Response ): Promise<Response> => {
    const token: Token = await sessionServices.login(req.body);
    return res.status(200).json(token);
};

export default { login };