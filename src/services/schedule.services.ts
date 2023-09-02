import { Schedule } from "../entities";
import { ScheduleCreate, ScheduleList, ScheduleReturn } from "../interfaces";
import { scheduleRepository } from "../repositories";
import { scheduleSchema } from "../schemas";

const create = async (payload: ScheduleCreate, userId: number): Promise<ScheduleReturn> => {
    const schedule: Schedule = scheduleRepository.create({
        date: payload.date,
        hour: payload.hour,
        realEstate: {
            id: payload.realEstateId
        },
        user: {
            id: userId
        }
    });
    await scheduleRepository.save(schedule);

    const result: ScheduleReturn = scheduleSchema.parse({
        ...schedule,
        realEstateId: schedule.realEstate.id,
        userId: schedule.user.id
    });

    return result;
};

const read = async ( realEstateId: number ): Promise<ScheduleList> => {
    const schedules: Schedule[] = await scheduleRepository.find({
        where: {
            realEstate: {
                id: realEstateId
            }
        },
        relations: {
            user: true,
            realEstate: true
        }
    });

    const scheduleList: ScheduleList = schedules.map((sched)=> {
        return scheduleSchema.parse({
            ...sched,
            userId: sched.user.id,
            realEstateId: sched.realEstate.id
        });
    });

    return scheduleList;
};

export default { create, read };