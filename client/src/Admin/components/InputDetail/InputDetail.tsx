function InputDetail({ title, value }: { title: string; value: string }) {
    return (
        <div className="">
            <label className="mb-2 block text-sm font-semibold text-gray-700">{title}</label>
            <input
                className={`focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2  text-sm leading-tight text-gray-700 shadow focus:outline-none`}
                disabled={true}
                defaultValue={value}
            />
        </div>
    );
}

export default InputDetail;
