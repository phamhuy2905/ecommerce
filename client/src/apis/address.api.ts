import { path } from "../helpers/path.helper";
import {
    AddressDefaultTypeResponse,
    AddressTypeResponse,
    CreatedAddressType,
    CreatedAddressTypeResponse,
} from "../types/address.type";
import http from "../utils/http";

const getAddressUser = async () => {
    const address = await http.instance.get<AddressTypeResponse>(`${path.api.address}`);
    return address.data.data;
};
const getAddressDefaultUser = async () => {
    const address = await http.instance.get<AddressDefaultTypeResponse>(`${path.api.address}/default`);
    return address.data.data;
};
const createdAddressByUser = async (data: CreatedAddressType) => {
    const address = await http.instance.post<CreatedAddressTypeResponse>(`${path.api.address}`, data);
    return address.data.data;
};

export { getAddressUser, getAddressDefaultUser, createdAddressByUser };
