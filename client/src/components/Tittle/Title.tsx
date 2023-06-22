function Title({ header, label, path }: { header: string; label: string; path?: string }) {
    return (
        <div className="flex justify-between items-center ">
            <h3 className="text-[24px] text-gray-700">{header}</h3>
            {path ? (
                <a href={path} className="text-[14px] text-white  py-[6px] px-5 bg-blue-500 rounded-[7px]">
                    {label}
                </a>
            ) : (
                <button className="text-[14px] text-white  py-[6px] px-5 bg-blue-500 rounded-[7px]">{label}</button>
            )}
        </div>
    );
}

export default Title;
