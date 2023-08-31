import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { realEstateCreateSchema } from "../schemas";
import { RealEstate } from "../entities";

type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;
type RealEstateRead = RealEstate[];
type RealEstateUpdate = DeepPartial<RealEstate>;
type RealEstateRepo = Repository<RealEstate>;

export { RealEstateCreate, RealEstateRead, RealEstateUpdate, RealEstateRepo };