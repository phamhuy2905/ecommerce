import { ResponseSuccessData } from "./success.type";

export interface DiscountResponseType extends ResponseSuccessData<DiscountType[]> {}

export interface DiscountType {
    _id: string;
    discountShop: string;
    discountName: string;
    discountCode: string;
    discountDesrciption: string;
    discountType: string;
    discountValue: number;
    discountStartDate: string;
    discountEndDate: string;
    discountMaxUse: number;
    discountCountUsed: number;
    discountUserAlreadyUsed: string[];
    discoutMaxEachUser: number;
    discountMinOrderValue: number;
    discountIsActive: boolean;
    discountApply: string;
    discountProductId: string[];
    isPublish: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
