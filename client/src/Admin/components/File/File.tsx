function File() {
    return (
        <div>
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="large_size">
                    Large file input
                </label>
                <input
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-lg text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                    id="large_size"
                    type="file"
                />
            </div>
        </div>
    );
}

export default File;
