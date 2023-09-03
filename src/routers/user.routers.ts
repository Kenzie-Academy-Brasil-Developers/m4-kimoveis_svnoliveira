import { Router } from "express";
import { bodyMiddleware, tokenMiddlewares, userMiddlewares } from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";
import { userControllers } from "../controllers";

const userRouter: Router = Router();

userRouter.post("",
bodyMiddleware.validate(userCreateSchema),
userMiddlewares.emailExists,
userControllers.create
);

userRouter.get("",
tokenMiddlewares.validate,
tokenMiddlewares.isAuthorized,
userControllers.read
);

userRouter.patch("/:id",
bodyMiddleware.validate(userUpdateSchema),
userMiddlewares.idExists,
tokenMiddlewares.validate,
tokenMiddlewares.isAuthorized,
userControllers.update
);

userRouter.delete("/:id",
userMiddlewares.idExists,
tokenMiddlewares.validate,
tokenMiddlewares.isAuthorized,
userControllers.destroy
);

export { userRouter };