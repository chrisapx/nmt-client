import React, { useState } from "react";
import ProductGrid from "./products/ProductGrid";
import { useListings } from "../../hooks/useListings";
import { IoReload } from "react-icons/io5";
import ProductForm from "./products/ProductForm";
import { BiPlus } from "react-icons/bi";
import { Button } from "primereact/button";

const Products = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [pages, setPages] = useState({ page: 0, count: 10 });
  const [addProduct, setAddProduct] = useState(false);
  const [reload, setReload] = useState(false);
  const { listings, hasMore, totalItems, loading } = useListings(pages.page, pages.count, reload, null, true);

  const tabs = [
    { id: "all", label: "All", count: listings?.length || 0, data: listings },
    { id: "approved", label: "Approved", count: listings.filter((item) => item.approved).length, data: listings.filter((item) => item.approved) },
    { id: "deleted", label: "Deleted", count: listings.filter((item) => item.deleted).length, data: listings.filter((item) => item.deleted) },
    { id: "limitedStock", label: "Limited Stock", count: listings.filter((item) => item.stockCount < 10).length, data: listings.filter((item) => item.stockCount < 10) },
    { id: "outOfStock", label: "Out of Stock", count: listings.filter((item) => item.stockCount === 0).length, data: listings.filter((item) => item.stockCount === 0) },
  ];

  const handleNextPage = () => {
    setPages((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handlePreviousPage = () => {
    setPages((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 0),
    }));
  };

  const handleItemsPerPageChange = (e) => {
    setPages((prev) => ({ ...prev, count: parseInt(e.target.value, 10) }));
  };

  return (
    <div className="">
      <p className="text-2xl text-gray-500 font-bold py-4">Inventory Panel</p>
      <p className="text-gray-400 text-sm font-bold px-3">Active nalmart.com listings</p>

      <div className="flex my-3 text-xs font-bold text-gray-500 border-b border-gray-300">
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
          <button
            onClick={() => setReload(!reload)}
            className="flex gap-2 items-center p-2 hover:text-black"
          >
            <IoReload />
            <span>Reload</span>
          </button>
          <button
            onClick={() => setAddProduct(true)}
            className="flex gap-2 items-center p-2 bg-red-400 text-white rounded hover:bg-red-500"
          >
            <BiPlus />
            <span>Add Product</span>
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll">
        <ProductGrid
          products={tabs.find((e) => e.id === selectedTab).data}
          isLoading={loading}
        />
      </div>
      <div className="flex justify-center gap-3 items-center mt-2 bg-gray-100 p-3 rounded-lg shadow-md">
        <p className="text-gray-600 text-sm">{listings?.length || 0} products</p>
        <Button
          icon="pi pi-angle-left"
          className="px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          disabled={pages.page === 0}
          onClick={handlePreviousPage}
        />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Page {pages.page}</span>
          <select
            value={pages.count}
            onChange={handleItemsPerPageChange}
            className="px-3 py-2 border text-xs border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
            <option value={200}>200 per page</option>
          </select>
        </div>
        <Button
          size="small"
          icon="pi pi-angle-right"
          className="py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          disabled={!hasMore}
          onClick={handleNextPage}
        />
      </div>
      <ProductForm visible={addProduct} setVisible={setAddProduct} />
    </div>
  );
};

export default Products;