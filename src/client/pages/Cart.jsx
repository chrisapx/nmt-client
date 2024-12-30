import { useEffect, useRef, useState } from 'react';
import Header from '../../components/header/Header';
import { useListings } from '../../hooks/useListings';
import Counter from '../components/Counter';
import { Radio } from '@mui/material';
import ProductCard from '../components/ProductCard';
import LoaderIcon from '../../global/LoaderIcon';
import { FaRegTrashCan } from 'react-icons/fa6';

const Cart = () => {
    const observerRef = useRef();
    const [pages, setPages] = useState({ page: 0, size: 10 });
    const { listings, loading, hasMore } = useListings(pages.page, pages.size);
    const [items, setItems] = useState([
        {
            itemId: 1,
            selected: true,
            name: 'Hot same resistant power bank',
            category: 'Electrical and fragile',
            price: 76000,
            quantity: 1,
            image: 'https://via.placeholder.com/150',
        },
        {
            itemId: 2,
            selected: false,
            name: 'Durable phone case',
            category: 'Impact-resistant and stylish',
            price: 25000,
            quantity: 1,
            image: 'https://via.placeholder.com/150',
        },
        {
            itemId: 3,
            selected: true,
            name: 'Wireless headphones',
            category: 'Noise-cancelling technology',
            price: 150000,
            quantity: 1,
            image: 'https://via.placeholder.com/150',
        },
    ]);

    useEffect(() => {
        if (loading) return;

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
    }, [loading, hasMore]);

    const handleCheckoutCart = () => {
        console.log('Checkout process initiated.');
    };

    const handleCountChange = (itemId, newCount) => {
        console.log('Updated count:', newCount, 'for', itemId);
    };

    const handleSelectCartItem = (e) => {
        console.log('Id to select is:', e.target.value);
    };

    const handleSelectAllCartItem = () => {
        console.log('selected All');
    };

    const handleClearCart = () => {
        confirm('Are you sure you want to clear the whole cart?');
    };

    const handleRemoveCartItem = (itemName) => {
        confirm('Are you sure you want to delete ' + itemName + ' from cart?');
    };

    return (
        <>
            <div className="md:hidden h-[100vh] w-[100vw] overflow-x-hidden">
                <div className="sticky top-0 py-2 z-50 bg-white px-3">
                    <Header showBack />
                </div>
                <div className="bg-gray-100 grid gap-2">
                    <section className="px-3 py-4 bg-white">
                        <p className="font-bold text-xl">Cart ({items?.length})</p>
                        <div className="flex gap-2 items-center">
                            <Radio
                                checked={items?.some((item) => item?.filtered)}
                                onChange={handleSelectAllCartItem}
                            />
                            Select all items |
                            <p
                                onClick={handleClearCart}
                                className="text-blue-700 underline select-none"
                            >
                                Clear cart
                            </p>
                        </div>
                    </section>
                    <section className="grid gap-4 py-2 px-3 bg-white">
                        {items.map((item, index) => (
                            <section key={index} className="flex gap-2 items-start">
                                <Radio
                                    checked={item?.selected}
                                    onChange={handleSelectCartItem}
                                    value={item?.itemId}
                                />
                                <div className="flex gap-3 w-full">
                                    <div className="w-20 h-20 rounded-md bg-gray-100 flex-shrink-0">
                                        <img
                                            src={item?.image}
                                            alt={item?.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="truncate w-full text-md text-sm flex justify-between items-center">
                                            {item?.name}{' '}
                                            <span>
                                                <FaRegTrashCan
                                                    onClick={() => handleRemoveCartItem(item?.name)}
                                                />
                                            </span>
                                        </p>
                                        <p className="text-gray-400 text-xs">{item?.category}</p>
                                        <div className="flex justify-between items-center mt-3">
                                            <p className="font-bold text-sm">UGX {item?.price}</p>
                                            <Counter
                                                count={item?.quantity}
                                                onChange={(newCount) =>
                                                    handleCountChange(item?.itemId, newCount)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </section>

                    <section className="pt-8 px-3 overflow-y-auto bg-white">
                        <p className="font-bold mb-4">More to love</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {listings.map((item, index) => (
                                <ProductCard key={item.id || index} item={item} />
                            ))}
                        </div>

                        {loading && hasMore && (
                            <div className="flex justify-center my-4">
                                <LoaderIcon />
                            </div>
                        )}

                        {!loading && hasMore && (
                            <div ref={observerRef} className="h-10"></div>
                        )}
                    </section>
                </div>

                <div className="absolute bottom-0 bg-white shadow-2xl w-full py-4 px-3">
                    <p className="flex justify-between pb-2 font-bold">
                        Total <span>UGX 288,283</span>
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