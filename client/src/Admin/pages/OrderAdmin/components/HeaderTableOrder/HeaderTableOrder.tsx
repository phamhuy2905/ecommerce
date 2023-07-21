import { UseDarkModeContext } from "../../../../context/darkMode.context";

function HeaderTableOrder({ data, isAll }: { data: string[]; isAll: boolean }) {
    const { darkMode } = UseDarkModeContext();
    return (
        <thead className={`${darkMode ? "dark" : "bg-gray-800"}`}>
            <tr>
                {data.map((val) => (
                    <th
                        key={val}
                        className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-transparent  px-6 py-3 text-left align-middle text-xs font-semibold   "
                    >
                        {val !== "Tick" ? val : <input type="checkbox" checked={isAll} />}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default HeaderTableOrder;
