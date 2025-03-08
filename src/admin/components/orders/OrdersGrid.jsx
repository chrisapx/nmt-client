import React, { useState, useEffect } from "react";
import LoaderIcon from "../../../global/LoaderIcon";
import { Sidebar } from "primereact/sidebar"
import { Button } from "primereact/button";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import ProductCard from "../../../client/components/ProductCard";

const OrdersGrid = ({ orders = [], isLoading = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const { getCartItems, loading } = useCart();
  
  useEffect(() => {
    if (selectAll) {
      setSelectedItems(orders.map((order) => order.id));
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, orders]);

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const getSelectedCartItems = async () => {
      const citems = selectedRecord ? await getCartItems(selectedRecord?.cart?.cartId) : [];
      console.log("Fetched products: " + citems);
      setCartItems(citems);
    }
    getSelectedCartItems();
  }, [selectedRecord])

  const handleRowClick = (row) => {
    searchParams.set("_panelOpen", true);
    setSearchParams(searchParams);
    setSelectedRecord(row);
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
                  Order ID
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Cart ID
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Customer ID
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Order Status
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Total Amount
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Special Instructions
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 truncate max-w-[10rem]">
                  Created On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {orders.map((row) => (
                <tr key={row.id} 
                  onClick={() => handleRowClick(row)}
                  className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700 max-w-[2rem]">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(row.id)}
                      onChange={() => toggleSelection(row.id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.orderId}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row?.cart?.cartId || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.customerId || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.orderStatus || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.totalAmount || "--"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.orderInstructions || "--"}
                  </td>
                  <td title={row?.createdAt} className="px-4 py-2 text-gray-700 truncate max-w-[10rem]">
                    {row.createdAt || "--"}
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

      <Sidebar 
        visible={searchParams.get('_panelOpen') === 'true'} 
        onHide={() => {
          searchParams.set("_panelOpen",  false );
          setSearchParams(searchParams)
        }} 
        position="right" 
        className="w-full md:w-[33vw] p-0"
        content={({ hide }) => {
          return(
          <div className="p-5 h-[100vh] overflow-y-auto">
            <section className='border-b flex justify-between items-center sticky -top-5 bg-white z-10'>
              <h2 className="text-xl font-bold">Order Details</h2>
              <Button 
                icon="pi pi-times" 
                className="p-button-rounded p-button-text p-button-sm" 
                onClick={() => {
                  setSelectedRecord(null);
                  hide();
                }}
              />
            </section>
            {selectedRecord ? (
              <div className="mt-4 space-y-6">
                <p>Order ID: { selectedRecord?.orderId}</p>
                <p>Cart ID: { selectedRecord?.cart?.cartId}</p>

                { loading && 
                  <p>Loading products...</p>
                }

                { cartItems?.map((item, index) => (
                  <ProductCard item={item} key={index}/>
                ))}
              </div>
            ) : (
              <p>No record selected</p>
            )}
          </div>
        )}}
      />
    </div>
  );
};

export default OrdersGrid;