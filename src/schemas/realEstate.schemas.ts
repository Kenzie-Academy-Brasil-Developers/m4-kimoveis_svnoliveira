import { z } from "zod";
import { addressCreateSchema } from "./address.schemas";

const realEstateSchema = z.object({
    id: z.number().positive(),
    sold: z.boolean().default(false),
    value: z.coerce.number()
        .multipleOf(0.01,"Value with over 2 decimal places is not allowed")
        .default(0),
    size: z.number().int(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressCreateSchema,
    categoryId: z.number(),
});

const realEstateCreateSchema = realEstateSchema.omit({ 
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true
});

export { realEstateSchema, realEstateCreateSchema };