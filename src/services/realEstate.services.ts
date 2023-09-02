import { Address, RealEstate } from "../entities";
import { RealEstateCreate, RealEstateWithAddress } from "../interfaces";
import { addressRepository, realEstateRepository } from "../repositories";
import { realEstateSchema } from "../schemas";

const create = async (payload: RealEstateCreate): Promise<RealEstateWithAddress> => {
    const address: Address = addressRepository.create(payload.address);
    await addressRepository.save(address);

    const realEstate: RealEstate = realEstateRepository.create({
        size: payload.size,
        value: payload.value,
        category: {
            id: payload.categoryId
        },
        address
    });
    await realEstateRepository.save(realEstate);

    const result: RealEstateWithAddress = realEstateSchema.parse({
        ...realEstate,
        categoryId: realEstate.category.id, 
        address: {
            ...address
        }
    });

    return result;
};

export default { create };