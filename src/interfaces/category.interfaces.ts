import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { categoryCreateSchema } from "../schemas";
import { Category } from "../entities";

type CategoryCreate = z.infer<typeof categoryCreateSchema>;
type CategoryRead = Category[];
type CategoryUpdate = DeepPartial<Category>;
type CategoryRepo = Repository<Category>;

export { CategoryCreate, CategoryRead, CategoryUpdate, CategoryRepo };