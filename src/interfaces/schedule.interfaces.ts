import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { scheduleCreateSchema } from "../schemas";
import { Schedule } from "../entities";

type ScheduleCreate = z.infer<typeof scheduleCreateSchema>;
type ScheduleRead = Schedule[];
type ScheduleUpdate = DeepPartial<Schedule>;
type ScheduleRepo = Repository<Schedule>;

export { ScheduleCreate, ScheduleRead, ScheduleUpdate, ScheduleRepo };