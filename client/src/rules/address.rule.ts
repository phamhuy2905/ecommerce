import { RegisterOptions } from "react-hook-form";

export interface AddressFormType {
    fullName: string;
    phoneNumber: string | number;
    address2: string;
}
export interface AddressVietNam {
    province: string;
    district: string;
    ward: string;
}
export interface FoundAddressVietNam {
    province: number;
    district: number;
    ward: number;
}
export interface HiddentAddressVietNam {
    province: boolean;
    district: boolean;
    ward: boolean;
}
type RuleAddressForm = { [key in keyof AddressFormType]: RegisterOptions };
export const addressFormRule: RuleAddressForm = {
    fullName: {
        minLength: {
            value: 6,
            message: "Trường fullName tối thiểu 6 kí tự!",
        },
    },
    address2: {
        minLength: {
            value: 6,
            message: "Trường address2 tối thiểu 6 kí tự!",
        },
    },
    phoneNumber: {
        minLength: {
            value: 10,
            message: "Trường phoneNumber tối thiểu 10 kí tự!",
        },
    },
};
