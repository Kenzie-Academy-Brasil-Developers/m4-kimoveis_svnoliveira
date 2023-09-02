import { Category, RealEstate } from "../entities";
import { CategoryCreate, CategoryList, RealEstateList } from "../interfaces";
import { categoryRepository, realEstateRepository } from "../repositories";
import { realEstateSchema } from "../schemas";

const create = async (payload: CategoryCreate): Promise<Category> => {
    const category: Category = categoryRepository.create(payload);
    await categoryRepository.save(category);
    return category;
};

const read = async (): Promise<CategoryList> => {
    const categoryList: CategoryList = await categoryRepository.find();
    return categoryList;
};

const readRealEstates = async (categoryId: number): Promise<RealEstateList> => {
    const realEstates: RealEstate[] = await realEstateRepository.find({
        where: {
            category: { 
                id: categoryId
            }
        },
        relations: {
            address: true
        }
    });

    const realEstateList: RealEstateList = realEstates.map((realEstate)=> {
        return realEstateSchema.parse({
            ...realEstate,
            categoryId: categoryId,
        });
    });

    return realEstateList;
};

export default { create, read, readRealEstates };