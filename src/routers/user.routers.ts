import { Router } from "express";
import { bodyMiddleware, userMiddlewares } from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";
import userControllers from "../controllers/user.controllers";

const userRouter: Router = Router();

userRouter.post("",
bodyMiddleware.validate(userCreateSchema),
userMiddlewares.emailExists,
userControllers.create
);

userRouter.get("",
//token is valid
//token is admin
userControllers.read
);

userRouter.patch("/:id",
bodyMiddleware.validate(userUpdateSchema),
//token is valid
//token is admin
userMiddlewares.idExists,
userControllers.update
);

userRouter.delete("/:id",
//token is valid
//token is admin
userMiddlewares.idExists,
userControllers.destroy
);

export { userRouter };