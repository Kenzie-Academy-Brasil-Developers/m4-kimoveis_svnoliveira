import { User } from "../entities";
import { AppError } from "../errors";
import { UserCreate, UserList, UserReturn, UserUpdate } from "../interfaces";
import { userRepository } from "../repositories";
import { userReturnSchema } from "../schemas";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  const user: User = userRepository.create(payload);
  await userRepository.save(user);
  return userReturnSchema.parse(user);
};

const read = async (): Promise<UserList> => {
  const userList: User[] = await userRepository.find();
  return userReturnSchema.array().parse(userList);
};

const update = async (payload: UserUpdate, user: User): Promise<UserReturn> => {
  const newUser: UserUpdate = { ...payload, id: user.id, admin: user.admin };
  const updatedUser = userRepository.create({ ...user, ...newUser });
  await userRepository.save(updatedUser);
  return userReturnSchema.parse(updatedUser);
};

const destroy = async (user: User): Promise<void> => {
  if (user.deletedAt) {
    throw new AppError("User already deleted", 409);
  };
  await userRepository.softRemove(user);
};

export default { create, read, update, destroy };