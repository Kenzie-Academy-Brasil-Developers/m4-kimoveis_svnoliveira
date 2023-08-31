import { AppDataSource } from './data-source';
import { Address, Category, RealEstate, Schedule, User } from './entities';
import { AddressRepo, CategoryRepo, RealEstateRepo, ScheduleRepo, UserRepo } from './interfaces';

const addressRepository: AddressRepo = AppDataSource.getRepository(Address);
const categoryRepository: CategoryRepo = AppDataSource.getRepository(Category);
const realEstateRepository: RealEstateRepo = AppDataSource.getRepository(RealEstate);
const scheduleRepository: ScheduleRepo = AppDataSource.getRepository(Schedule);
const userRepository: UserRepo = AppDataSource.getRepository(User);

export { 
    addressRepository,
    categoryRepository,
    realEstateRepository,
    scheduleRepository,
    userRepository 
};