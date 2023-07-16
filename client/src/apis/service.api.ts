import axios from "axios";

export interface ProvincesType {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: number;
    districts: District[];
}
export interface District {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    short_codename: number;
    wards: Ward[];
}
interface Ward {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    short_codename: number;
}
const getDataVietNam = async () => {
    const data = await axios.get<ProvincesType[]>("https://provinces.open-api.vn/api/?depth=3");
    return data.data;
};

export { getDataVietNam };
