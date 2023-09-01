import { userSchema } from "./user.schemas";


const loginSchema = userSchema.pick({ email: true, password: true });

export { loginSchema };