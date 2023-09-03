import { z } from "zod";

const scheduleSchema = z.object({
    id: z.number().positive(),
    date: z.string()
        .transform((value) => value.replace(/\//g,"-"))
        .refine((newString) => /\d{4}-\d{2}-\d{2}/.test(newString),
        "Date does not follow the format AAAA-MM-DD"
    ),
    hour: z.string()
        .refine((string) => /\d{2}:\d{2}/.test(string), "Hour does not follow the format HH:MM"),
    userId: z.number(),
    realEstateId: z.number(),

});

const scheduleCreateSchema = scheduleSchema.omit({ 
    id: true, 
    userId: true
});

export { scheduleSchema, scheduleCreateSchema };