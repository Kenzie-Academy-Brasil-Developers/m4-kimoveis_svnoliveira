import { z } from "zod";

const scheduleSchema = z.object({
    id: z.number().positive(),
    date: z.date(),
    hour: z.string().datetime(),
    userId: z.number(),
    realEstateId: z.number(),
});

const scheduleCreateSchema = scheduleSchema.omit({ 
    id: true, 
    userId: true, 
    realEstateId: true 
});

const scheduleUpdateSchema = scheduleCreateSchema.partial();

export { scheduleSchema, scheduleCreateSchema, scheduleUpdateSchema };