import { z } from "zod";
import { Repository } from "typeorm";
import { scheduleCreateSchema, scheduleSchema } from "../schemas";
import { Schedule } from "../entities";

type ScheduleReturn = z.infer<typeof scheduleSchema>;
type ScheduleCreate = z.infer<typeof scheduleCreateSchema>;
type ScheduleList = ScheduleReturn[];
type ScheduleRepo = Repository<Schedule>;

export { ScheduleReturn, ScheduleCreate, ScheduleList, ScheduleRepo };