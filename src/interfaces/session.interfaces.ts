import { z } from "zod";
import { loginSchema } from "../schemas";

type Login = z.infer<typeof loginSchema>;
type Token = { token: string };

export { Token, Login };