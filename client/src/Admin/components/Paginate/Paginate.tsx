import { TypePage } from "../../../types/product.type";
import { test } from "../../../utils/paginate";
import { UseDarkModeContext } from "../../context/darkMode.context";

export default function Paginate({ pages, currentPage }: { pages: TypePage; currentPage: number }) {
    const { darkMode } = UseDarkModeContext();
    const seperatePage = test(pages.totalPage);
    return (
        <div
            className={`${
                darkMode ? "dark border-gray-500 " : "border-gray-200 bg-white  "
            } flex items-center justify-between border-t px-4 py-3 sm:px-6`}
        >
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="mx-1 font-medium">
                            {pages.totalItems < 10 ? pages.totalItems : pages.itemsPerPage}
                        </span>
                        item in
                        <span className="mx-1 font-medium">{pages.totalItems} result</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {seperatePage[currentPage - 1].map((val, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                    <a
                                        href={`?page=${val}`}
                                        className={`relative z-10 inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold  text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                            ${+val === +currentPage ? "bg-indigo-600  text-white" : "bg-white"}`}
                                    >
                                        {val}
                                    </a>
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
}
