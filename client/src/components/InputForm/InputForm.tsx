import type { UseFormRegister, RegisterOptions } from "react-hook-form";

interface Props {
    title?: string;
    messageError?: string;
    name: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    placeholder?: string;
    register: UseFormRegister<any>;
    rule?: RegisterOptions;
}
function InputForm({ title, messageError, name, placeholder, register, rule, type = "text" }: Props) {
    return (
        <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor={name}>
                {title}
            </label>
            <input
                className={`focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2  text-sm leading-tight text-gray-700 shadow focus:outline-none ${
                    messageError ? "border-red-500" : ""
                }`}
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name, rule)}
            />
            <p className="min-h-[16px] text-xs italic text-red-500">{messageError}</p>
        </div>
    );
}

export default InputForm;
