import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Details = lazy(() => import('../client/pages/Details'));
const OrderStatus = lazy(() => import('../client/pages/OrderStatus'));
const OrderDetails = lazy(() => import('../client/pages/OrderDetails'));
const OrderSuccess = lazy(() => import('../client/pages/OrderSuccess'));
const Home = lazy(() => import('../client/pages/Home'));
const SearchPage = lazy(() => import('../main-pages/search/SearchPage'));
const SearchResults = lazy(() => import('../main-pages/search-results/MainSearchResults'));
const NotFoundPage = lazy(() => import('../main-pages/notFound/NotFound'));
const Cart = lazy(() => import('../client/pages/Cart'));
const Account = lazy(() => import('../main-pages/profile/Account'));
const Checkout = lazy(() => import('../client/pages/Checkout'));
const Payment = lazy(() => import('../main-pages/payment/Payment'));
const MainListing = lazy(() => import('../main-pages/listings/MainListing'));

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/_sr/:input" element={<SearchResults />} />
      <Route path="/details/:itemID?" element={<Details />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />
      <Route path="/checkout/:totalPrice?" element={<Checkout />} />
      <Route path="/payment/:pstatus" element={<Payment />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/order-status/:orderId?" element={<OrderStatus />} />
      <Route path="/order-details/:orderId?" element={<OrderDetails />} />
      <Route path="/listings/:category" element={<MainListing />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ClientRoutes;