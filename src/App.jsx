import { Suspense, lazy, useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom'
import AddItem from './seller-pages/add-item/AddItem'
import { CartProvider } from './context/CartContext'
import AdminHome from './seller-pages/home-page/AdminHome'
import { ListingProvider } from './context/ListingContext'
import Notification from './components/Notification'
import Loading from './actions/utils/Loader'
import OtpDialogue from './auth-pages/user/OtpDialogue'
import PhotosAction from './actions/PhotosAction'
import LoginDialogue from './auth-pages/user/Login';
import LoadingSpinner from './global/LoadingSpinner';
import { LoadingProvider } from './context/LoaderContext';
import DesktopMessage from './client/components/DesktopMessage';

const Details = lazy(() => import('./client/pages/details/Details'))
const Home = lazy(() => import('./client/pages/home/Home'))
const SearchPage = lazy(() => import('./main-pages/search/SearchPage'))
const SearchResults = lazy(() => import('./main-pages/search-results/MainSearchResults'))
const NotFoundPage = lazy(() => import('./main-pages/notFound/NotFound'))
const Cart = lazy(() => import('./client/pages/cart/Cart'))
const Account = lazy(() => import('./main-pages/profile/Account'))
const Checkout = lazy(() => import('./client/pages/checkout/Checkout'))
const Payment = lazy(() => import('./main-pages/payment/Payment'))
const MainListing = lazy(() => import('./main-pages/listings/MainListing'))
const Login = lazy(() => import('./auth-pages/login/LoginPage'))
const Signup = lazy(() => import('./auth-pages/signup/Signup'))


function App() {
  return (
    <div>
      <Notification />
      <Loading/>
      <PhotosAction/>
      <OtpDialogue/>
      <DesktopMessage/>
      <LoginDialogue/>
        <LoadingProvider>
          <ListingProvider>
            <CartProvider>
              <Suspense fallback={ <LoadingSpinner/> }>
                <Routes>
                    <Route path="/" element={ <Home/> } />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/_sr/:input" element={<SearchResults />} />
                    <Route path="/details/:itemID?" element={<Details />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/checkout/:totalPrice?" element={<Checkout />} />
                    <Route path="/payment/:pstatus" element={<Payment />} />
                    <Route path="/listings/:category" element={<MainListing />} />
                    <Route path="/add-item" element={<AddItem />} />
                    <Route path='/admin-home' element={<AdminHome/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFoundPage />} /> 
                </Routes>
              </Suspense>
            </CartProvider>
          </ListingProvider>
        </LoadingProvider>
    </div>
  )
}

export default App