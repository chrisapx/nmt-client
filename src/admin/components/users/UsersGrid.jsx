import React, { useState, useEffect } from "react";
import LoaderIcon from "../../../global/LoaderIcon";
import { Verified } from "@mui/icons-material";

const UsersGrid = ({ users = [], isLoading = false }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(users.map((user) => user.id));
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, users]);

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
                  User ID
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Full Names
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Email
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Phone
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  System Role
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Verified
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Creation Date
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Update Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {users.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700 max-w-[2rem]">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(row.id)}
                      onChange={() => toggleSelection(row.id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.userId || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.FullName || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.email || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.phone || "--"}
                  </td>
                  <td className={`px-4 py-2 text-gray-700 truncate max-w-[10rem] font-bold ${row.role === 'ADMIN' ? 'text-red-500' : 'text-green-500'}`}>
                    {row.role || "--"}
                  </td>
                  <td className={`px-4 py-2 text-gray-700 truncate max-w-[10rem] font-bold`}>
                    {row.verified ? <Verified className="text-green-500"/> : "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.createdAt || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.updatedAt || "--"}
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

export default UsersGrid;