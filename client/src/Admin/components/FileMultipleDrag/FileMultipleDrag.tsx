import toast, { Toaster } from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { validateImg } from "../../../helpers/validateImage";
import { useState } from "react";
interface FileMultipleDragType {
    title: string;
    name: string;
    multiple?: boolean;
    file: FileList[];
    fileDeletes?: string[];
    imageSever?: string[];
    setFileDeletes?: React.Dispatch<React.SetStateAction<string[]>>;
    setFile: React.Dispatch<React.SetStateAction<FileList[]>>;
}
function FileMultipleDrag({
    title,
    name,
    multiple,
    setFile,
    file,
    fileDeletes,
    setFileDeletes,
    imageSever,
}: FileMultipleDragType) {
    const [key, setKey] = useState(1);
    const [reviews, setReviews] = useState<string[]>(imageSever || []);
    const handleChangeFile = (e: any) => {
        const check = validateImg(e);
        if (!check) {
            toast.error("File chỉ được dạng gif, png, jpg, jpe");
            setKey(Date.now());
            return;
        }
        let arr: any[] = [];
        let fsArr: any[] = [];
        const files = e.target.files;
        const keys = Object.keys(files);
        keys.forEach((val) => {
            const fs = files[val];
            const reader = new FileReader();
            reader.onload = function (event) {
                arr = [...arr, event.target?.result + `:data-set${Date.now()}`];
                fsArr = [...fsArr, fs];
            };
            reader.onloadend = function () {
                setFile([...file, ...fsArr]);
                setReviews([...reviews, ...arr]);
            };
            reader.readAsDataURL(files[val]);
        });
        setKey(Date.now());
    };

    const handleDeleteImage = (dataset: string) => {
        const newReviews = reviews.filter((val) => val !== dataset);
        setReviews(newReviews);
        if (!dataset.startsWith("data") && setFileDeletes && fileDeletes) {
            setFileDeletes([...fileDeletes, dataset]);
            return;
        }
        file.forEach((val) => {
            const reader = new FileReader();
            reader.readAsDataURL(val as any);
            reader.onload = function (event) {
                if (event.target?.result === dataset) {
                    setFile(file.filter((value) => value !== val));
                    return;
                }
            };
        });
    };

    return (
        <div className="mb-10">
            <p className="mb-2 text-gray-500">{title}</p>
            <div className="flex w-full items-center justify-center">
                <label
                    htmlFor={name}
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                        id={name}
                        type="file"
                        className="hidden"
                        name={name}
                        multiple={multiple}
                        onChange={handleChangeFile}
                        key={key}
                    />
                </label>
            </div>

            {reviews.length ? (
                <div className="mt-3 flex flex-wrap items-center px-2 py-2">
                    {reviews.map((val, index) => {
                        return (
                            <div
                                className="relative mx-2 mb-2 select-none overflow-hidden rounded-[7px] bg-gray-200 p-2"
                                key={index}
                            >
                                <img
                                    className="h-[170px] w-[170px]  object-cover"
                                    alt="Preview"
                                    src={val.split(":data-set")[0]}
                                />
                                <span
                                    className="absolute right-2 top-2 cursor-pointer text-[20px]"
                                    onClick={() => handleDeleteImage(val)}
                                >
                                    <HiXMark />
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
            <Toaster />
        </div>
    );
}

export default FileMultipleDrag;
