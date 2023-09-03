import { Router } from "express";
import { bodyMiddleware, categoryMiddlewares, realEstateMiddlewares, tokenMiddlewares } from "../middlewares";
import { realEstateCreateSchema } from "../schemas";
import { realEstateControllers } from "../controllers";

const realEstateRouter: Router = Router();

realEstateRouter.post("",
tokenMiddlewares.validate,
tokenMiddlewares.isAuthorized,
bodyMiddleware.validate(realEstateCreateSchema),
realEstateMiddlewares.addressExists,
categoryMiddlewares.idExists,
realEstateControllers.create
);

realEstateRouter.get("",
realEstateControllers.read
);

export { realEstateRouter };