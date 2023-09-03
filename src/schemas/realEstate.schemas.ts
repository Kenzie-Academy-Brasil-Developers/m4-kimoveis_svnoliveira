import { z } from "zod";
import { addressCreateSchema, addressSchema } from "./address.schemas";
import { categorySchema } from "./category.schemas";

const realEstateSchema = z.object({
    id: z.number().positive(),
    sold: z.boolean().default(false),
    value: z.coerce.number()
        .multipleOf(0.01,"Value with over 2 decimal places is not allowed")
        .default(0),
    size: z.number().int().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressSchema,
    category: categorySchema,
});

const realEstateCreateSchema = realEstateSchema.omit({ 
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
    category: true,
    address: true
}).extend({ 
    categoryId: z.number().positive(), 
    address: addressCreateSchema 
});

export { realEstateSchema, realEstateCreateSchema };