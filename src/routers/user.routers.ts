import { Router } from "express";
import { bodyMiddleware, userMiddlewares } from "../middlewares";
import { userCreateSchema } from "../schemas";
import userControllers from "../controllers/user.controllers";

const userRouter: Router = Router();

userRouter.post("",
bodyMiddleware.validate(userCreateSchema),
userMiddlewares.emailExists,
userControllers.create
);

export { userRouter };