import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { addressCreateSchema } from "../schemas";
import { Address } from "../entities";

type AddressCreate = z.infer<typeof addressCreateSchema>;
type AddressRead = Address[];
type AddressUpdate = DeepPartial<Address>;
type AddressRepo = Repository<Address>;

export { AddressCreate, AddressRead, AddressUpdate, AddressRepo };