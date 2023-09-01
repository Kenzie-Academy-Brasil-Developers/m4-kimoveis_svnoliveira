import { Router } from "express";
import { bodyMiddleware } from "../middlewares";
import { loginSchema } from "../schemas";
import { sessionControllers } from "../controllers";

const sessionRouter: Router = Router();

sessionRouter.post("",
bodyMiddleware.validate(loginSchema),
sessionControllers.login
);

export { sessionRouter };