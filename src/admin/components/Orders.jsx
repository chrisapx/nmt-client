import React, { useState } from "react";
import { IoReload } from "react-icons/io5";
import { useOrders } from "../../hooks/useOrders";
import OrdersGrid from "./orders/OrdersGrid";

const Orders = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [pages, setPages] = useState({ page: 0, count: 10});
//   const [addCategory, setAddCategory] = useState(false);
  const [reload, setReload] = useState(true);
  const { orders, loading } = useOrders(pages.page, pages.count, reload);
  
  const tabs = [
    { id: "all", label: "All", count: orders.length || 0, data: orders },
  ];

  return (
    <div>
      <p className="text-3xl text-gray-500 font-bold py-4">Orders</p>
      <p className="text-gray-400 text-sm font-bold px-3">Active nalmart.com orders</p>

      <div className="flex  my-3 text-xs font-bold text-gray-500 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`cursor-pointer pb-2 text-center px-4 ${
              selectedTab === tab.id
                ? "text-red-500 font-bold border-b-2 border-red-500"
                : "hover:text-red-500"
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            <span>{tab.label}</span>
            <span className="ml-1 text-gray-400">({tab.count})</span>
          </button>
        ))}
        <div className="flex gap-4 mb-2 items-center ml-auto cursor-pointer text-gray-400">
            <button onClick={() => setReload(!reload)} className="flex gap-2 items-center p-2 hover:text-black">
                <IoReload/>
                <span className="">Reload </span>
            </button>
            {/* <button onClick={() => setAddCategory(true)} className="flex gap-2 items-center p-2 bg-red-400 text-white rounded hover:bg-red-500">
                <BiPlus className=""/> 
                <span>Add Category</span>
            </button> */}
        </div>
      </div>

      <OrdersGrid orders={tabs?.find(e => e.id === selectedTab).data} isLoading={ loading }/>
    
      {/* <CategoriesForm visible={addCategory} setVisible={setAddCategory}/> */}
    </div>
  );
};

export default Orders;