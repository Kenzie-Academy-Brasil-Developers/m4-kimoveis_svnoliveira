import "express-async-errors"
import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";
import { scheduleRepository } from "../repositories";

const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  
  const date: string = req.body.date.replace(/\//g,"-");
  const hour: string = req.body.hour;
  const tentativeSchedule: Date = new Date(`${date}T${hour}:00`);

  if (String(tentativeSchedule) === "Invalid Date") {
    throw new AppError("Invalid Date", 409);
  };

  const weekday: number = tentativeSchedule.getDay();
  const tentativeHour: number = tentativeSchedule.getHours();
  if (weekday === 0 || weekday === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  };

  if (tentativeHour < 8 || tentativeHour > 17) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  };

  const isUserScheduled = await scheduleRepository.findOne({
    where: {
      user: {
        id: res.locals.tokenData.id
      },
      date: date.replace(/\-/g,"/"),
      hour
    }
  });

  if (isUserScheduled) {
    throw new AppError("User schedule to this real estate at this date and time already exists", 409);
  };

  const isRealEstateScheduled = await scheduleRepository.findOne({
    where: {
      realEstate: {
        id: req.body.realEstateId
      },
      date: date.replace(/\-/g,"/"),
      hour
    }
  });

  if (isRealEstateScheduled) {
    throw new AppError("Schedule to this real estate at this date and time already exists", 409);
  };

  return next();
};

export default { validate };