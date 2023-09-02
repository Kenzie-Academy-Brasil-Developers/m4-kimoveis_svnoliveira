import { Router } from "express";
import { bodyMiddleware, realEstateMiddlewares, scheduleMiddlewares, tokenMiddlewares } from "../middlewares";
import { scheduleCreateSchema } from "../schemas";
import { scheduleControllers } from "../controllers";

const scheduleRouter: Router = Router();

scheduleRouter.post("",
bodyMiddleware.validate(scheduleCreateSchema),
tokenMiddlewares.validate,
realEstateMiddlewares.idExists,
scheduleMiddlewares.validate,
scheduleControllers.create
);

scheduleRouter.get("/realEstate/:id",
realEstateMiddlewares.idExists,
scheduleControllers.read
);

export { scheduleRouter };