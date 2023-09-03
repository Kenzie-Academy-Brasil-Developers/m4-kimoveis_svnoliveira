import { z } from "zod";
import { Repository } from "typeorm";
import { realEstateCreateSchema } from "../schemas";
import { RealEstate } from "../entities";

type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;
type RealEstateList = RealEstate[];
type RealEstateRepo = Repository<RealEstate>;

export { RealEstateCreate, RealEstateList, RealEstateRepo };