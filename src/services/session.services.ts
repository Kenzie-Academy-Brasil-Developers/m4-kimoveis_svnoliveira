import "dotenv/config";
import { sign } from "jsonwebtoken";
import { Login, Token } from "../interfaces";
import { AppError } from "../errors";
import { compareSync } from "bcryptjs";
import { User } from "../entities";
import { userRepository } from "../repositories";

const login = async (payload: Login): Promise<Token> => {
    const { email, password } = payload;
    const user: User | null = await userRepository.findOne({
        where: { email: email }
    });

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    };

    const passwordIsValid: boolean = compareSync(password, user.password);
    if (!passwordIsValid) {
        throw new AppError("Invalid credentials", 401);
    };

    const token = sign({
        email: user.email,
        admin: user.admin,
        id: user.id
    }, String(process.env.SECRET_KEY), {
        expiresIn: process.env.EXPIRES_IN, subject: String(user.id)
    } )
    return { token: token };
};

export default { login };