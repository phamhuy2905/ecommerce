import { RegisterOptions, UseFormGetValues } from "react-hook-form";
import { AddProductType } from "../../../../types/product.type";

export const initialAddProduct: AddProductType = {
    productName: "",
    productType: "",
    productQuantity: "",
    productPrice: "",
    productDescription: "",
    productBrand: "",
    size: [],
    material: "",
};
type Rules = { [key in keyof Omit<AddProductType, "productAttribute">]: RegisterOptions };
export const rules = (_getValues: UseFormGetValues<AddProductType>): Rules => {
    return {
        productName: {
            required: {
                value: true,
                message: "Trường productName thì bắt buộc!",
            },
            minLength: {
                value: 6,
                message: "Trường productName tối thiểu 6 kí tự!",
            },
        },
        productType: {
            required: {
                value: true,
                message: "Trường productType thì bắt buộc!",
            },
        },
        productQuantity: {
            required: {
                value: true,
                message: "Trường productQuantity thì bắt buộc!",
            },
            min: {
                value: 0,
                message: "Trường productQuantity nên lớn hơn 0!",
            },
        },
        productPrice: {
            required: {
                value: true,
                message: "Trường productPrice thì bắt buộc!",
            },
            min: {
                value: 0,
                message: "Trường productPrice nên lớn hơn 0!",
            },
        },
        productDescription: {
            required: {
                value: true,
                message: "Trường productDescription thì bắt buộc!",
            },
            minLength: {
                value: 30,
                message: "Trường productDescription tối thiểu 30 kí tự!",
            },
        },
        productBrand: {
            required: {
                value: true,
                message: "Trường brand thì bắt buộc!",
            },
            minLength: {
                value: 3,
                message: "Trường brand tối thiểu 3 kí tự!",
            },
        },
    };
};
