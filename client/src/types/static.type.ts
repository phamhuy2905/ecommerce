import { ResponseSuccessData } from "./success.type";

interface CategoryType {
    _id: string;
    info: {
        name: string;
        quantityProduct: number;
    };
}
export type CategoryResponseType = ResponseSuccessData<CategoryType[]>;
