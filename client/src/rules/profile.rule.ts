import { RegisterOptions } from "react-hook-form";

interface ProfileType {
    email: string;
    fullName: string;
    address: string;
    address2: string;
    phoneNumber: string;
}
type RuleProfileType = { [key in keyof ProfileType]: RegisterOptions };
export const profileRule: RuleProfileType = {
    email: {},
    fullName: {
        minLength: {
            value: 6,
            message: "Trường fullName tối thiểu 6 kí tự!",
        },
    },
    address: {
        minLength: {
            value: 6,
            message: "Trường address tối thiểu 6 kí tự!",
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
