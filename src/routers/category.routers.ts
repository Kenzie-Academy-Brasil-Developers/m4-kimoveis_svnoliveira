import { Router } from "express";
import { bodyMiddleware, categoryMiddlewares, tokenMiddlewares } from "../middlewares";
import { categoryCreateSchema } from "../schemas";
import { categoryControllers } from "../controllers";

const categoryRouter: Router = Router();

categoryRouter.post("",
bodyMiddleware.validate(categoryCreateSchema),
tokenMiddlewares.validate,
tokenMiddlewares.isAuthorized,
categoryMiddlewares.nameExists,
categoryControllers.create
);

categoryRouter.get("",
categoryControllers.read
);

categoryRouter.get("/:id/realEstate",
categoryMiddlewares.idExists,
categoryControllers.readRealEstates
);

export { categoryRouter };