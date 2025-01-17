import { useEffect, useRef, useState } from 'react';
import Header from '../../components/header/Header';
import { useListings } from '../../hooks/useListings';
import { useCart } from '../../hooks/useCart';
import Counter from '../components/Counter';
import { Radio } from '@mui/material';
import ProductCard from '../components/ProductCard';
import LoaderIcon from '../../global/LoaderIcon';
import { FaRegTrashCan } from 'react-icons/fa6';
import { getUserToken } from '../../components/utils/AuthCookiesManager';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const observerRef = useRef();
    const [pages, setPages] = useState({ page: 0, size: 10 });
    const [productDetails, setProductDetails] = useState({});
    const [cartAmount, setCartAmount] = useState();
    const { listings, fetchItem, loading: listingsLoading, hasMore } = useListings(pages.page, pages.size);
    const {
        cart,
        loading,
        error,
        addItemToCart,
        removeItemFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartTotalCost
    } = useCart();

    useEffect(() => {
        const getTotalCost = async () => {
            setCartAmount(await getCartTotalCost(cart.cartId));
        }
        getTotalCost();
    }, [cart]);

    useEffect(() => {
        if (listingsLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPages((prev) => ({ ...prev, page: prev.page + 1 }));
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [listingsLoading, hasMore]);

    useEffect(() => {
        const fetchProductDetails = async () => {
          const details = {};
          for (const item of cart.cartItems) {
            if (!productDetails[item.productId]) {
              try {
                const response = await fetchItem(item.productId);
                if (response) {
                  console.log(`Product for cart item ${item.productId} is`, response);
                  details[item.productId] = response;
                }
              } catch (err) {
                console.error(`Failed to fetch product for item ${item.productId}:`, err);
              }
            }
          }
          setProductDetails((prev) => ({ ...prev, ...details }));
        };
        fetchProductDetails();
    }, [cart]);

    const handleCheckoutCart = () => {
        navigate("/checkout");
        // alert("Check again tomorrow, checkout function will be ready");
        // console.log('Checkout process initiated.');
    };

    const handleCountChange = (itemId, newCount) => {
        console.log(itemId + " " + newCount)
        updateCartItemQuantity(itemId, newCount);
    };

    const handleSelectCartItem = (e) => {
        const itemId = e.target.value;
        const item = cart.cartItems.find((item) => item.itemId === parseInt(itemId));
        if (item) {
            addItemToCart({ ...item, selected: !item.selected });
        }
    };

    const handleSelectAllCartItem = () => {
        const allSelected = cart.cartItems.every((item) => item.selected);
        cart.cartItems.forEach((item) => addItemToCart({ ...item, selected: !allSelected }));
    };

    const handleClearCart = () => {
        if (confirm('Are you sure you want to clear the whole cart?')) {
            clearCart(cart.cartId);
        }
    };

    const handleRemoveCartItem = (itemId, itemName) => {
        if (confirm(`Are you sure you want to delete ${itemName} from the cart?`)) {
            removeItemFromCart(itemId);
        }
    };

    const totalAmount = cart.cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <div className="md:hidden h-[100vh] w-[100vw] overflow-x-hidden">
                <div className="sticky top-0 z-50 bg-white px-3">
                    <Header showBack showMenuIcon />
                </div>
                <div className="bg-gray-100 grid gap-2">
                    <section className="flex justify-between px-3 py-4 bg-white">
                        <p className="font-bold text-xl">Cart ({cart.cartItems?.length})</p>
                        <div className="flex gap-2 items-center">
                            {/* <Radio
                                checked={cart.cartItems?.every((item) => item.selected)}
                                onChange={handleSelectAllCartItem}
                            />
                            Select all items | */}
                            <p
                                onClick={handleClearCart}
                                className="text-blue-700 underline select-none"
                            >
                                Clear cart
                            </p>
                        </div>
                    </section>
                    <section className="grid gap-4 py-2 px-3 bg-white">
                        { cart.cartItems?.map((item, index) => { 
                            const product = productDetails[item.productId];
                        return (
                            <section key={index} className="flex gap-2 items-start">
                                {/* <Radio
                                    checked={item?.selected}
                                    onChange={handleSelectCartItem}
                                    value={item?.itemId}
                                /> */}
                                <div className="flex gap-3 w-full">
                                    <div className="w-25 h-20 rounded-md bg-gray-100 flex-shrink-0">
                                        <img
                                            src={product?.photos[0].url}
                                            alt={product?.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="flex gap-4 w-full text-md text-sm flex justify-between items-center">
                                            {product?.name || "--"}{' '}
                                            <span>
                                                <FaRegTrashCan
                                                    onClick={() =>
                                                        handleRemoveCartItem(item?.cartItemId, product?.name)
                                                    }
                                                />
                                            </span>
                                        </p>
                                        <p className="text-gray-400 text-xs">{product?.category || "--"}</p>
                                        <div className="flex justify-between items-center mt-3">
                                            <p className="font-bold text-sm">UGX {product?.price?.toLocaleString() || "--"}</p>
                                            <Counter
                                                count={item?.quantity}
                                                onChange={(newCount) =>
                                                    handleCountChange(item?.cartItemId, newCount)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )})}
                    </section>

                    <section className="pt-8 px-3 overflow-y-auto bg-white">
                        <p className="font-bold mb-4">More to love</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {listings.map((item, index) => (
                                <ProductCard key={item.id || index} item={item} />
                            ))}
                        </div>

                        {listingsLoading && hasMore && (
                            <div className="flex justify-center my-4">
                                <LoaderIcon />
                            </div>
                        )}

                        {!listingsLoading && hasMore && (
                            <div ref={observerRef} className="h-10"></div>
                        )}
                    </section>
                </div>

                <div className="absolute bottom-0 bg-white shadow-2xl w-full py-4 px-3">
                    <p className="flex justify-between pb-2 font-bold">
                        Total <span>UGX {cartAmount?.toLocaleString()}</span>
                    </p>
                    <div
                        className="text-center bg-red-500 py-3 rounded-full text-white font-bold"
                        onClick={handleCheckoutCart}
                    >
                        Checkout
                    </div>
                </div>
            </div>

            {/* Desktop view */}
            <section className="hidden md:block">
                <p>Desktop view coming soon.</p>
            </section>
        </>
    );
};

export default Cart;