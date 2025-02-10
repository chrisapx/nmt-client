export const createItemsTree = (categories) => {
    const categoryMap = {};
    const tree = [];
  
    categories.forEach((category) => {
      categoryMap[category.categoryId] = { ...category, children: [] };
    });
  
    categories.forEach((category) => {
      if (category.parentCategoryId) {
        categoryMap[category.parentCategoryId]?.children.push(categoryMap[category.categoryId]);
      } else {
        tree.push(categoryMap[category.categoryId]);
      }
    });
    console.log("Built tree is: ", {tree})
  
    return tree;
  };