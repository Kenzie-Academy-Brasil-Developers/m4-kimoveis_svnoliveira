import { Request, Response } from "express";
import { ScheduleList, SchedulesFromRealEstate } from "../interfaces";
import { scheduleServices } from "../services";
import { RealEstate } from "../entities";

const create = async ( req: Request, res: Response ): Promise<Response> => {
    const userId: number = res.locals.tokenData.id;
    await scheduleServices.create(req.body, userId);

    return res.status(201).json({message: "Schedule created"});
};

const read = async ( req: Request, res: Response ): Promise<Response> => {
    const realEstate: RealEstate = res.locals.realEstate;
    const scheduleList: SchedulesFromRealEstate = await scheduleServices.read(realEstate);

    return res.status(200).json(scheduleList);
};

export default { create, read };