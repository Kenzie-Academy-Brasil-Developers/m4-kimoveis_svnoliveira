import "express-async-errors"
import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";
import { scheduleRepository } from "../repositories";

const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  
  const date: string = req.body.date;
  const hour: string = req.body.hour;
  const tentativeSchedule: Date = new Date(`${date}T${hour}:00`);
  if (String(tentativeSchedule) === "Invalid Date") {
    throw new AppError("Invalid Date", 409);
  };

  const weekday: number = tentativeSchedule.getDay();
  const tentativeHour: number = tentativeSchedule.getHours();
  console.log(weekday);
  if (weekday === 0 || weekday === 6) {
    throw new AppError("Date cannot be on a Saturday or Sunday", 409);
  };

  if (tentativeHour < 8 || tentativeHour > 17) {
    throw new AppError("The hour must be between 08:00 and 18:00", 409);
  };

  const isUserScheduled = await scheduleRepository.findOne({
    where: {
      user: {
        id: res.locals.tokenData.id
      },
      date,
      hour
    }
  });

  const isRealEstateScheduled = await scheduleRepository.findOne({
    where: {
      realEstate: {
        id: req.body.realEstateId
      },
      date,
      hour
    }
  });

  if (isUserScheduled) {
    throw new AppError("The user is already scheduled for this date and hour", 409);
  };

  if (isRealEstateScheduled) {
    throw new AppError("The real estate is already scheduled for this date and hour", 409);
  };

  return next();
};

export default { validate };