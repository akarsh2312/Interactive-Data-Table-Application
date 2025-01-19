import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

function DataTable({ data, itemsPerPage }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (columnKey) => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (valueA < valueB) return sortConfig.direction === "ascending" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      item.Domain.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedData, searchQuery]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-800">
          Dashboard
        </h1>
        <p className="text-gray-700 text-base md:text-lg mt-1">
          Welcome! Explore your data with ease and style.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative px-4 md:px-6 mb-4 md:mb-6">
        <input
          type="text"
          placeholder="Search by Domain"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-indigo-300 rounded-lg w-full pl-12 focus:ring-4 focus:ring-indigo-300 focus:outline-none bg-white shadow-sm"
        />
        <MagnifyingGlassIcon
          className="absolute left-4 top-2/4 transform -translate-y-2/4 text-indigo-500 h-6 w-6"
          aria-hidden="true"
        />
      </div>

      {/* Table Container */}
      <div className="flex-1 px-4 md:px-6 overflow-auto">
        <table className="w-full table-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white">
              {[
                "Domain",
                "Niche 1",
                "Niche 2",
                "Traffic",
                "DR",
                "DA",
                "Language",
                "Price",
                "Spam Score",
              ].map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer"
                  onClick={() => handleSort(column)}
                >
                  {column}
                  <span className="ml-2">
                    {sortConfig.key === column ? (
                      sortConfig.direction === "ascending" ? (
                        <ChevronUpIcon className="h-4 w-4 inline" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 inline" />
                      )
                    ) : (
                      <ChevronUpDownIcon className="h-4 w-4 inline" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-indigo-50" : "bg-white"
                  } hover:bg-indigo-100`}
                >
                  <td className="px-4 py-4 text-sm text-gray-800 truncate">
                    {item.Domain}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 truncate">
                    {item["Niche 1"]}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 truncate">
                    {item["Niche 2"]}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {item.Traffic}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {item.DR}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {item.DA}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {item.Language}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {item.Price}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {item["Spam Score"]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="px-4 py-6 text-center text-gray-500 text-sm"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 md:mt-6 flex flex-wrap justify-between items-center px-4 md:px-6 space-y-2 md:space-y-0">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700 mx-auto md:mx-0">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
