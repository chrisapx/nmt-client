import React, { useState, useEffect } from "react";
import { TreeSelect } from "primereact/treeselect";
import { api_urls } from "../../../components/utils/ResourceUrls";
import { createItemsTree } from "../../../components/utils/TreeBuilder";

const CategoryTreeSelect = ({ value, onChange }) => {
  const [nodes, setNodes] = useState(null);
  const [selectedNodeKey, setSelectedNodeKey] = useState(value);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(api_urls.items.categories.get_all);
        const rawCategories = await response.json();

        const mappedCategories = rawCategories.map((cat) => ({
          ...cat,
          label: cat.name,
          key: cat.categoryId,
          data: cat.categoryId
        }));

        const nestedCategories = createItemsTree(mappedCategories);
        console.log(nestedCategories);
        setNodes(nestedCategories);
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedNodeKey(value);
  }, [value]);

  const handleSelectionChange = (e) => {
    setSelectedNodeKey(e.value);
    onChange(e.value);
  };

  return (
    <div className="card">
      <TreeSelect
        value={selectedNodeKey}
        onChange={handleSelectionChange}
        options={nodes}
        className="w-full border"
        placeholder="Select a Category"
      />
    </div>
  );
};

export default CategoryTreeSelect;
