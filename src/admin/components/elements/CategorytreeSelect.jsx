import React, { useState, useEffect } from "react";
import { TreeSelect } from "primereact/treeselect";
import { api_urls } from "../../../utils/ResourceUrls";

const CategoryTreeSelect = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(value);
  const [expandedNodes, setExpandedNodes] = useState([]);

  useEffect(() => {
    setSelectedCategory(value);
  }, [value]);

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await fetch(api_urls.items.categories.get_all_top_level);
        const formattedCategories = (await response.json()).map((parent) => ({
          key: parent.categoryId,
          label: parent.name,
          leaf: false,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    fetchParentCategories();
  }, []);

  const loadSubcategories = async (node) => {
    try {
      const response = await fetch(api_urls.items.categories.get_subCategories(node.key));
      const subcategories = (await response.json()).map((sub) => ({
        key: sub.categoryId,
        label: sub.name,
        leaf: true,
      }));

      setCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (cat.key === node.key) {
            return { ...cat, children: subcategories };
          }
          return cat;
        })
      );
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSelectionChange = (e) => {
    setSelectedCategory(e.value);
    onChange(e.value);
  };

  return (
    <div className="card">
      <TreeSelect
        value={selectedCategory}
        options={categories}
        filter
        onChange={handleSelectionChange}
        onNodeExpand={(e) => loadSubcategories(e.node)}
        expandedKeys={expandedNodes}
        onToggle={(e) => setExpandedNodes(e.value)}
        placeholder="Select a Category"
        className="w-full border"
      />
    </div>
  );
};

export default CategoryTreeSelect;