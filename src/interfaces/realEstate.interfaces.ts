import { z } from "zod";
import { Repository } from "typeorm";
import { realEstateCreateSchema, realEstateSchema } from "../schemas";
import { RealEstate } from "../entities";

type RealEstateWithAddress = z.infer<typeof realEstateSchema>;
type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;
type RealEstateList = RealEstateWithAddress[];
type RealEstateRepo = Repository<RealEstate>;

export { RealEstateWithAddress, RealEstateCreate, RealEstateList, RealEstateRepo };