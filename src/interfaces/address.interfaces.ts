import { z } from "zod";
import { Repository } from "typeorm";
import { addressCreateSchema } from "../schemas";
import { Address } from "../entities";

type AddressCreate = z.infer<typeof addressCreateSchema>;
type AddressRepo = Repository<Address>;

export { AddressCreate, AddressRepo };