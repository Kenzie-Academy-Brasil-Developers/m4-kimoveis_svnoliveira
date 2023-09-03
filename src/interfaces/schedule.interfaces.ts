import { z } from "zod";
import { Repository } from "typeorm";
import { scheduleCreateSchema } from "../schemas";
import { RealEstate, Schedule } from "../entities";

type ScheduleCreate = z.infer<typeof scheduleCreateSchema>;
type ScheduleList = Schedule[];
type ScheduleRepo = Repository<Schedule>;

interface SchedulesFromRealEstate extends RealEstate {
    schedules: ScheduleList
};

export { ScheduleCreate, ScheduleList, ScheduleRepo, SchedulesFromRealEstate };