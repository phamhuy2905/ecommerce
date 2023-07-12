import "react-toastify/dist/ReactToastify.css";
import InputForm from "../../../../../components/InputForm";
import { AddProductType } from "../../../../../types/product.type";
import { useForm } from "react-hook-form";
import { rules } from "../../../../components/validation/Product/addProduct";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../redux/store";
import { useState } from "react";
import InputMultiple from "../../../../components/InputMultiple";
import FileMultipleDrag from "../../../../components/FileMultipleDrag";
import FileDrag from "../../../../components/FileDrag";
import { omit } from "lodash";
import { formDataV2 } from "../../../../../helpers/formData.helper";
import { editProductAdmin, startFetching } from "../../../../../redux/actions/productAdmin.slice";
import { errorResponse } from "../../../../../utils/error";
import toast from "react-hot-toast";
import Button from "../../../../../components/Button";
function EditProduct({ setIsOpenModal }: { setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { productDetail } = useSelector((state: RootState) => state.productAdmin);
    const [arrSize, setArrSize] = useState<string[]>(productDetail.productAttribute.size || []);
    const [arrColor, setArrColor] = useState<string[]>(productDetail.productAttribute.color || []);
    const [thumbnail, setThumbnail] = useState<any>();
    const [multipleThumbnail, setMultipleThumbnail] = useState<FileList[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [fileDeletes, setFileDeletes] = useState<string[]>([]);
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddProductType>({
        defaultValues: {
            productBrand: productDetail.productBrand,
            productName: productDetail.productName,
            productType: productDetail.productName,
            productQuantity: productDetail.productQuantity,
            productPrice: productDetail.productPrice,
            productDescription: productDetail.productDescription,
            size: productDetail.productAttribute.size,
            material: productDetail.productAttribute.material,
            color: productDetail.productAttribute.color,
        },
    });

    const dispatch = useAppDispatch();
    const _rules = rules(getValues);
    const handleEditProduct = handleSubmit((data) => {
        setDisabled(true);
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
            fileDeletes,
        });
        dispatch(startFetching());
        dispatch(editProductAdmin({ id: productDetail._id, data: payload }))
            .unwrap()
            .then(() => {
                setIsOpenModal(false);
                toast.success("Sửa sản phẩm thành công");
                reset();
                setArrColor([]);
                setArrSize([]);
                setThumbnail(null);
                setMultipleThumbnail([]);
            })
            .catch((err) => {
                const error = errorResponse(err);
                toast.error(error || "Something wrong!!!");
            })
            .finally(() => {
                setDisabled(false);
            });
    });
    return (
        <div>
            <h4 className="flex items-center text-[20px] text-gray-600">Edit sản phẩm</h4>
            <div className="h-[100px] w-[100px] overflow-hidden rounded-[10px] bg-gray-200 px-2 py-2">
                <img className="h-full w-full object-cover" src={productDetail.productThumbnail} alt="Product" />
            </div>
            <div className="my-5 grid grid-cols-3 gap-x-5 gap-y-4">
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
            <div className="grid grid-cols-2 gap-4">
                <InputMultiple name="size" placeholder="Nhập size" arr={arrSize} setArr={setArrSize} />
                <InputMultiple name="color" placeholder="Nhập color" arr={arrColor} setArr={setArrColor} />
            </div>
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
                imageSever={productDetail.productMultipleThumbnail}
                fileDeletes={fileDeletes}
                setFileDeletes={setFileDeletes}
            />
            <Button
                onClick={handleEditProduct}
                isLoading={disabled}
                disabled={disabled}
                type="button"
                className="mt-7 rounded-[2px] bg-green-500 px-10  py-2 text-white"
            >
                Edit Product
            </Button>
        </div>
    );
}

export default EditProduct;
