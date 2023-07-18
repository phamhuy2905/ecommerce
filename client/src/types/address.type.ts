import { ResponseSuccessData } from "./success.type";

export interface AddressType {
    _id: string;
    addressUser: string;
    fullName: string;
    phoneNumber: string | number;
    country: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    address2?: string;
    zipCode?: string | number;
    isDefault: boolean;
    isPublish: boolean;
}

export interface CreatedAddressType {
    fullName: string;
    phoneNumber: string | number;
    province: string;
    district: string;
    ward: string;
    address: string;
    address2?: string;
    isDefault: boolean;
}

export interface SaveAddressType {
    id: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    address2?: string;
    fullName: string;
    phoneNumber: string | number;
    isDefault: boolean;
}

export interface AddressTypeResponse extends ResponseSuccessData<AddressType[]> {}
export interface AddressDefaultTypeResponse extends ResponseSuccessData<AddressType> {}
export interface CreatedAddressTypeResponse extends ResponseSuccessData<AddressType> {}
