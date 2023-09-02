import { Router } from "express";
import { bodyMiddleware, categoryMiddlewares, realEstateMiddlewares, tokenMiddlewares } from "../middlewares";
import { realEstateCreateSchema } from "../schemas";
import { realEstateControllers } from "../controllers";

const realEstateRouter: Router = Router();

realEstateRouter.post("",
bodyMiddleware.validate(realEstateCreateSchema),
tokenMiddlewares.validate,
tokenMiddlewares.isAuthorized,
realEstateMiddlewares.addressExists,
categoryMiddlewares.idExists,
realEstateControllers.create
);

export { realEstateRouter };