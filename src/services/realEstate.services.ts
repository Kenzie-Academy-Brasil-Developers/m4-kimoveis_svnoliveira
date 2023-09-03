import { Address, Category, RealEstate } from "../entities";
import { RealEstateCreate, RealEstateList } from "../interfaces";
import { addressRepository, realEstateRepository } from "../repositories";
import { realEstateSchema } from "../schemas";

const create = async (payload: RealEstateCreate, category: Category): Promise<RealEstate> => {
    const address: Address = addressRepository.create(payload.address);
    await addressRepository.save(address);
    
    const realEstate: RealEstate = realEstateRepository.create({
        size: payload.size,
        value: payload.value,
        category,
        address
    });
    await realEstateRepository.save(realEstate);

    
    const result: RealEstate = realEstateSchema.parse(realEstate);

    return result;
};

const read = async (): Promise<RealEstateList> => {
    const realEstateList: RealEstateList = await realEstateRepository.find({
        relations: {
            address: true
        }
    });
    
    return realEstateList
};

export default { create, read };