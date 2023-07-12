import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
type Rules = { [key in "email" | "password" | "fullName" | "password_confirm"]: RegisterOptions };

export const getRules = (getValues?: UseFormGetValues<any>): Rules => {
    return {
        email: {
            required: {
                value: true,
                message: "Trường email thì bắt buộc!",
            },
            pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Vui lòng nhập đúng định dạng email",
            },
        },
        fullName: {
            required: {
                value: true,
                message: "Trường fullName thì bắt buộc!",
            },
            min: {
                value: 3,
                message: "Trường fullName tối thiểu 3 kí tự!",
            },
        },
        password: {
            required: {
                value: true,
                message: "Trường password thì bắt buộc!",
            },
            minLength: {
                value: 8,
                message: "Trường password tối thiểu 8 kí tự!",
            },
        },
        password_confirm: {
            required: {
                value: true,
                message: "Trường password confirm thì bắt buộc!",
            },
            minLength: {
                value: 8,
                message: "Trường password confirm tối thiểu 8 kí tự!",
            },
            validate: (value: string) =>
                typeof getValues === "function"
                    ? getValues("password") === value
                        ? true
                        : "Password confirm không hợp lệ"
                    : undefined,
        },
    };
};
