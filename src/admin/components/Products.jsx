import React, { useState } from "react";
import ProductGrid from "./products/ProductGrid";
import { useListings } from "../../hooks/useListings";
import { IoReload } from "react-icons/io5";
import ProductForm from "./products/ProductForm";
import { BiPlus } from "react-icons/bi";

const Products = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [pages, setPages] = useState({ page: 0, count: 10});
  const [addProduct, setAddProduct] = useState(false);
  const [reload, setReload] = useState(false);
  const { listings, loading } = useListings(pages.page, pages.count, reload);
  
  const tabs = [
    { id: "all", label: "All", count: listings.length || 0, data: listings },
    { id: "approved", label: "Approved", count: ( listings.filter(item => item.approved)).length, data: listings.filter(item => item.approved)  },
    { id: "deleted", label: "Deleted", count: (listings.filter(item => item.deleted)).length, data: listings.filter(item => item.deleted) },
    { id: "limitedStock", label: "Limited Stock", count: ( listings.filter(item => item.stockCount < 10)).length, data: listings.filter(item => item.stockCount < 10)  },
    { id: "outOfStock", label: "Out of Stock", count: ( listings.filter(item => item.stockCount === 0)).length, data: listings.filter(item => item.stockCount === 0) },
  ];

  return (
    <div>
      <p className="text-3xl text-gray-500 font-bold py-4">Inventory Panel</p>
      <p className="text-gray-400 text-sm font-bold px-3">Active nalmart.com listings</p>

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
            <button onClick={() => setAddProduct(true)} className="flex gap-2 items-center p-2 bg-red-400 text-white rounded hover:bg-red-500">
                <BiPlus className=""/> 
                <span>Add Product</span>
            </button>
        </div>
      </div>

      <ProductGrid products={tabs?.find(e => e.id === selectedTab).data} isLoading={ loading }/>
    
      <ProductForm visible={addProduct} setVisible={setAddProduct}/>
    </div>
  );
};

export default Products;