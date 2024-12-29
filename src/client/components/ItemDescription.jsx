import React from 'react';

const ItemDescription = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default ItemDescription;
