import { z } from "zod";
import { Repository } from "typeorm";
import { categoryCreateSchema } from "../schemas";
import { Category } from "../entities";
import { RealEstateList } from "./realEstate.interfaces";

type CategoryCreate = z.infer<typeof categoryCreateSchema>;
type CategoryList = Category[];
type CategoryRepo = Repository<Category>;
type CategoryRealEstates = {
    id: number,
    name: string,
    realEstate: RealEstateList
};

export { CategoryCreate, CategoryList, CategoryRepo, CategoryRealEstates };