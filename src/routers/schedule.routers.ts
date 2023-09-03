import { Router } from "express";
import { bodyMiddleware, realEstateMiddlewares, scheduleMiddlewares, tokenMiddlewares } from "../middlewares";
import { scheduleCreateSchema } from "../schemas";
import { scheduleControllers } from "../controllers";

const scheduleRouter: Router = Router();

scheduleRouter.post("",
tokenMiddlewares.validate,
bodyMiddleware.validate(scheduleCreateSchema),
realEstateMiddlewares.idExists,
scheduleMiddlewares.validate,
scheduleControllers.create
);

scheduleRouter.get("/realEstate/:id",
tokenMiddlewares.validate,
tokenMiddlewares.isAuthorized,
realEstateMiddlewares.idExists,
scheduleControllers.read
);

export { scheduleRouter };