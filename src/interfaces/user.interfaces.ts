import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { userCreateSchema, userReturnSchema } from "../schemas";
import { User } from "../entities";

type UserCreate = z.infer<typeof userCreateSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserRead = User[];
type UserUpdate = DeepPartial<User>;
type UserRepo = Repository<User>;

export { UserCreate, UserRead, UserUpdate, UserRepo, UserReturn };