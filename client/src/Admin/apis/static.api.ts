import { path } from "../../helpers/path.helper";
import http from "../../utils/http";

interface Category {
    _id: string;
    info: {
        name: string;
        quantity: number;
    };
}
interface CategoryResponse {
    success: boolean;
    status: number;
    message: string;
    data: Category[];
}

const getCategoryAdmin = async () => {
    const orders = await http.instance.get<CategoryResponse>(path.apiAdmin.static.category);
    return orders.data.data;
};

export { getCategoryAdmin };
