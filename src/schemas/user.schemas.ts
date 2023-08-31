import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean().default(false),
    password: z.string().max(120),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
});

const userCreateSchema = userSchema.omit({ 
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true 
});

const userUpdateSchema = userCreateSchema.partial();
const userReturnSchema = userSchema.omit({ password: true });

export { userSchema, userCreateSchema, userUpdateSchema, userReturnSchema };