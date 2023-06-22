import { path } from "../helpers/path.helper";
import { CategoryResponseType } from "../types/static.type";
import http from "../utils/http";

const getCategory = async () => await http.instance.get<CategoryResponseType>(`${path.api.static}/category`);

export { getCategory };
