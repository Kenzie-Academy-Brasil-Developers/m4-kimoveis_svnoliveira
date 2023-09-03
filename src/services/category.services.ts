import { Category } from "../entities";
import { CategoryCreate, CategoryList, CategoryRealEstates, RealEstateList } from "../interfaces";
import { categoryRepository, realEstateRepository } from "../repositories";

const create = async (payload: CategoryCreate): Promise<Category> => {
    const category: Category = categoryRepository.create(payload);
    await categoryRepository.save(category);
    return category;
};

const read = async (): Promise<CategoryList> => {
    const categoryList: CategoryList = await categoryRepository.find();
    return categoryList;
};

const readRealEstates = async (category: Category): Promise<CategoryRealEstates> => {
    const realEstateList: RealEstateList = await realEstateRepository.find({
        where: {
            category: { 
                id: category.id
            }
        }
    });

    return {
        id: category.id,
        name: category.name,
        realEstate: realEstateList
    };
};

export default { create, read, readRealEstates };