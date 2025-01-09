import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Details = lazy(() => import('../client/pages/Details'));
const OrderStatus = lazy(() => import('../client/pages/OrderStatus'));
const OrderDetails = lazy(() => import('../client/pages/OrderDetails'));
const OrderSuccess = lazy(() => import('../client/pages/OrderSuccess'));
const Home = lazy(() => import('../client/pages/Home'));
const Cart = lazy(() => import('../client/pages/Cart'));
const Checkout = lazy(() => import('../client/pages/Checkout'));

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/search" element={<SearchPage />} /> */}
      {/* <Route path="/_sr/:input" element={<SearchPage />} /> */}
      <Route path="/details/:itemID?" element={<Details />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="/account" element={<Account />} /> */}
      <Route path="/checkout/:totalPrice?" element={<Checkout />} />
      {/* <Route path="/payment/:pstatus" element={<Payment />} /> */}
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/order-status/:orderId?" element={<OrderStatus />} />
      <Route path="/order-details/:orderId?" element={<OrderDetails />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default ClientRoutes;