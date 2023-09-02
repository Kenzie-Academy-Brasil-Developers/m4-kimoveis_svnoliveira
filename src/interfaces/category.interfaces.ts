import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { categoryCreateSchema } from "../schemas";
import { Category } from "../entities";

type CategoryCreate = z.infer<typeof categoryCreateSchema>;
type CategoryList = Category[];
type CategoryRepo = Repository<Category>;

export { CategoryCreate, CategoryList, CategoryRepo };