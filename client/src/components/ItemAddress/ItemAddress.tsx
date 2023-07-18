import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AddressType, SaveAddressType } from "../../types/address.type";
function ItemAddress({
    item,
    setInfoAddress,
}: {
    item: AddressType;
    infoAddress: SaveAddressType;
    setInfoAddress: React.Dispatch<React.SetStateAction<SaveAddressType>>;
}) {
    const { _id, province, district, ward, address, address2, fullName, phoneNumber, isDefault = false } = item;
    const addressId = useSelector((state: RootState) => state.discount.addressId);
    return (
        <div className="flex items-start border-b-[1px] border-[#ddd] px-3 py-3">
            <input
                defaultChecked={addressId === _id}
                name="address"
                type="radio"
                className="mt-2 h-[20px] w-[20px]"
                onChange={() => {
                    setInfoAddress({
                        id: _id,
                        address,
                        address2,
                        fullName,
                        phoneNumber,
                        province,
                        isDefault,
                        district,
                        ward,
                    });
                }}
            />
            <div className="mx-2 flex flex-1 flex-col items-start ">
                <div className="flex items-center">
                    <p className="mr-1 text-[15px]">{fullName}</p>
                    <p className="text-[14px] text-gray-500">(+84) {phoneNumber}</p>
                </div>
                <span className="my-2 text-[13px] text-gray-400">
                    {`${address2 ? address2 : ""} ${", " + address}${", " + ward}${", " + district}${", " + province}`}
                </span>
                {isDefault && (
                    <p className="border-[1px] border-blue-500 px-2 py-1 text-[13px] text-blue-400">Mặc định</p>
                )}
            </div>
            <button className="whitespace-nowrap text-[14px] text-orange-500">Cập nhật</button>
        </div>
    );
}

export default ItemAddress;
