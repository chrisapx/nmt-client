import React from 'react';
import Products from './Products';
import { useLocation } from 'react-router-dom';
import Categories from './Categories';
import Orders from './Orders';
import Users from './Users';

const Body = () => {
  const location = useLocation();

  const renderContent = () => {
    if (location.pathname.includes('product')) {
      return <Products />;
    } else if (location.pathname.includes('orders')) {
      return <Orders/>;
    } else if (location.pathname.includes('categories')) {
      return <Categories/>; 
    } else if (location.pathname.includes('users')) {
      return <Users/>; 
    } else {
      return <div>Page Not Found</div>; 
    }
  };

  return (
    <div className="bg-gray-100 flex-1 p-4 overflow-scroll rounded-3xl my-4 mr-4 shadow-lg">
      {renderContent()}
    </div>
  );
};

export default Body;