import { z } from "zod";

const realEstateSchema = z.object({
    id: z.number().positive(),
    sold: z.boolean().default(false),
    value: z.number()
        .refine(x => x * 100 - Math.trunc(x * 100)< Number.EPSILON, 
        "Value with over 2 decimal places is not allowed")
        .default(0),
    size: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    addressId: z.number(),
    categoryId: z.number(),
});

const realEstateCreateSchema = realEstateSchema.omit({ 
    id: true, 
    addressId: true, 
    categoryId: true 
});

const realEstateUpdateSchema = realEstateCreateSchema.partial();

export { realEstateSchema, realEstateCreateSchema, realEstateUpdateSchema };