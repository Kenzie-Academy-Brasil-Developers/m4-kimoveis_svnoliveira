import { RealEstate, Schedule } from "../entities";
import { ScheduleCreate, ScheduleList, SchedulesFromRealEstate } from "../interfaces";
import { scheduleRepository } from "../repositories";

const create = async (payload: ScheduleCreate, userId: number): Promise<void> => {

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
    return;
};

const read = async ( realEstate: RealEstate ): Promise<SchedulesFromRealEstate> => {
    const schedules: ScheduleList = await scheduleRepository.find({
        where: {
            realEstate: {
                id: realEstate.id
            }
        },
        relations: {
            user: true, 
        }
    });

    const schedulesFromRealEstate: SchedulesFromRealEstate = {
        ...realEstate,
        schedules
    };

    return schedulesFromRealEstate;
};

export default { create, read };