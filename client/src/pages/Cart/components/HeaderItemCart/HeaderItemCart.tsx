function HeaderItemCart() {
    return (
        <div className="my-3 grid grid-cols-2 bg-white px-3 py-3">
            <div className="flex items-center">
                <input type="checkbox" />
                <div className="mx-3">
                    <p className="ml-3 text-[15px] text-gray-500">Sản Phẩm</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p className="ml-3 text-[15px] text-gray-500">Đơn Giá</p>
                <p className="ml-3 text-[15px] text-gray-500">Số Lượng</p>
                <p className="ml-3 text-[15px] text-gray-500">Số Tiền</p>
            </div>
        </div>
    );
}

export default HeaderItemCart;
