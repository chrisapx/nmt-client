import { Verified } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import LoaderIcon from "../../../global/LoaderIcon";

const SlickTable = ({ products = [], isLoading = false }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(products.map((product) => product.id));
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, products]);

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <LoaderIcon color={"gray-200"} />
        </div>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-sm font-bold">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600 max-w-[2rem]">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={() => setSelectAll(!selectAll)}
                  />
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[5rem]">
                  Approved
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[8rem]">
                  Unit Price
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Description
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[8rem]">
                  Stock Count
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Upload Date
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Uploaded By
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {products.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700 max-w-[2rem]">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(row.id)}
                      onChange={() => toggleSelection(row.id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.name}
                  </td>
                  <td className="px-4 py-2 text-gray-700 max-w-[5rem]">
                    {row.approved ? (
                      <Verified className="p-1 text-green-800" /> 
                    ) : <i className="pi pi-times text-xs text-center p-1"/> }
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[8rem]">
                    {row.price || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.description || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[8rem]">
                    {row.stockCount || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-400 truncate max-w-[10rem]">
                    {row.createdAt || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-400 truncate max-w-[10rem]">
                    {row.vendorId || "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 flex justify-between items-center">
            <button
              className="px-4 text-xs py-2 bg-red-500 text-white rounded hover:bg-blue-600"
              onClick={() => console.log("Previous page")}
            >
              Previous
            </button>
            <button
              className="px-4 text-xs py-2 bg-red-500 text-white rounded hover:bg-blue-600"
              onClick={() => console.log("Next page")}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SlickTable;