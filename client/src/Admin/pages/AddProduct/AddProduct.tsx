import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { UseDarkModeContext } from "../../context/darkMode.context";
import { AddProductType } from "../../../types/product.type";
import { initialAddProduct, rules } from "../../components/validation/Product/addProduct";
import InputForm from "../../../components/InputForm";
import FileDrag from "../../components/FileDrag";
import { useState } from "react";
import InputMultiple from "../../components/InputMultiple";
import FileMultipleDrag from "../../components/FileMultipleDrag";
import Button from "../../../components/Button";
import { formDataV2 } from "../../../helpers/formData.helper";
import { omit } from "lodash";
import { useAppDispatch } from "../../../redux/store";
import { postProductAdmin } from "../../../redux/actions/productAdmin.slice";
import { errorResponse } from "../../../utils/error";
import { useQuery } from "react-query";
import { getCategoryAdmin } from "../../apis/static.api";

function AddProduct() {
    const { darkMode } = UseDarkModeContext();
    const [arrSize, setArrSize] = useState<string[]>([]);
    const [arrColor, setArrColor] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState<any>();
    const [multipleThumbnail, setMultipleThumbnail] = useState<FileList[]>([]);
    const dispatch = useAppDispatch();
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddProductType>({ defaultValues: initialAddProduct });
    const _rules = rules(getValues);
    const handleTest = handleSubmit((data) => {
        const body = omit(data, ["brand", "color", "material", "size"]);
        const fd = new FormData();
        if (thumbnail) delete thumbnail.review;
        const payload = formDataV2(fd, {
            ...body,
            productThumbnail: thumbnail,
            productMultipleThumbnail: multipleThumbnail,
            productAttribute: {
                color: arrColor,
                size: arrSize,
                material: data.material,
            },
        });
        dispatch(postProductAdmin(payload))
            .unwrap()
            .then(() => {
                toast.success("Thêm sản phẩm thành công");
                reset();
                setArrColor([]);
                setArrSize([]);
                setThumbnail(null);
                setMultipleThumbnail([]);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch((err) => {
                const error = errorResponse(err);
                toast.error(error || "Something wrong!!!");
            });
    });
    const { data = [] } = useQuery({
        queryKey: ["categoryAdmin"],
        queryFn: getCategoryAdmin,
    });

    return (
        <div className={` ${darkMode ? "dark_soft" : "bg-white"} px-5 py-5 shadow-md`}>
            <h4 className="mb-5 text-[20px] font-semibold">Add Category</h4>
            <form className="text-center" encType="multipart/form-data">
                <div className="grid grid-cols-3 gap-5">
                    <InputForm
                        register={register}
                        name="productName"
                        rule={_rules.productName}
                        title="Tên sản phẩm"
                        placeholder="Nhập tên sản phẩm"
                        messageError={errors.productName?.message}
                    />
                    <InputForm
                        register={register}
                        name="productType"
                        rule={_rules.productType}
                        title="Loại sản phẩm"
                        placeholder="Nhập loại sản phẩm"
                        messageError={errors.productType?.message}
                    />
                    <InputForm
                        register={register}
                        name="productQuantity"
                        rule={_rules.productQuantity}
                        title="Số lượng sản phẩm"
                        placeholder="Nhập số lượng sản phẩm"
                        messageError={errors.productQuantity?.message}
                    />
                    <InputForm
                        register={register}
                        name="productPrice"
                        rule={_rules.productPrice}
                        title="Giá sản phẩm"
                        placeholder="Nhập giá sản phẩm"
                        messageError={errors.productPrice?.message}
                    />
                    <InputForm
                        register={register}
                        name="productBrand"
                        rule={_rules.productBrand}
                        title="Brand "
                        placeholder="Nhập brand"
                        messageError={errors.productBrand?.message}
                    />

                    <InputForm
                        register={register}
                        name="material"
                        rule={_rules.material}
                        title="Material "
                        placeholder="Nhập material"
                        messageError={errors.material?.message}
                    />
                </div>
                <InputMultiple name="size" placeholder="Nhập size" arr={arrSize} setArr={setArrSize} />
                <InputMultiple name="color" placeholder="Nhập color" arr={arrColor} setArr={setArrColor} />
                <InputForm
                    register={register}
                    name="productDescription"
                    rule={_rules.productDescription}
                    title="Mô tả sản phẩm "
                    placeholder="Nhập mô tả sản phẩm"
                    messageError={errors.productDescription?.message}
                />
                <FileDrag title="Chọn thumbnail" name="productThumbnail" setFile={setThumbnail} file={thumbnail} />
                <FileMultipleDrag
                    title="Chọn nhiều thumnail(tối thiểu 3)"
                    name="productMultipleThumbnail"
                    setFile={setMultipleThumbnail}
                    file={multipleThumbnail}
                    multiple={true}
                />
                <Button
                    onClick={handleTest}
                    isLoading={false}
                    disabled={false}
                    type="button"
                    className="mt-7 rounded-[2px] bg-green-500 px-10  py-2 text-white"
                >
                    Add Product
                </Button>
            </form>
            <Toaster />
        </div>
    );
}

export default AddProduct;
