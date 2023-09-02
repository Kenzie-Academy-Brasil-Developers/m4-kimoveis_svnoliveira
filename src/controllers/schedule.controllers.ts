import { Request, Response } from "express";
import { ScheduleList, ScheduleReturn } from "../interfaces";
import { scheduleServices } from "../services";

const create = async ( req: Request, res: Response ): Promise<Response> => {
    const userId: number = res.locals.tokenData.id;
    const schedule: ScheduleReturn = await scheduleServices.create(req.body, userId);

    return res.status(201).json(schedule);
};

const read = async ( req: Request, res: Response ): Promise<Response> => {
    const realEstateId: number = Number(req.params.id);
    const scheduleList: ScheduleList = await scheduleServices.read(realEstateId);

    return res.status(200).json(scheduleList);
};

export default { create, read };