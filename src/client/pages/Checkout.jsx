import React, { useEffect } from 'react'
import { useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { MdOutlineEditNote, MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { RiBankCardLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { isAuthenticated } from '../../components/utils/AuthCookiesManager'
import { useListings } from '../../hooks/useListings'

const Checkout = () => {
    const navigate = useNavigate();
    const { fetchItem } = useListings();
    const [itemCount, setItemCount] = useState(1);
    const [productDetails, setProductDetails] = useState({});
    const deliveryFee = 3000;
    const [order, setOrder] = useState({ cartId: "", orderInstructions: "", shippingFee: ""});
    const { cart, totalCost } = useCart();

    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/');
        }
    })

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

    const toggleAddressMenu = () => {

    }

    const handlePlaceOrder = () => {
        confirm("Are you sure you want to place the order");
    }

  return (
    <>
        <div>
        <div className='md:hidden relative grid gap-3 bg-gray-100 h-[100vh]'>
            <header className='flex justify-between items-center px-3 py-4 text-xl bg-white sticky top-0'>
                <Link to={-1} className='text-2xl'><BsChevronLeft/></Link>
                <p className='font-bold'>Checkout</p>
                <i></i>
            </header>
            <section className='flex-1 overflow-y-auto'>
                <section className='px-3 py-2 bg-white'>
                    <p className='font-bold text-md py-2'>Shipping address</p>
                    <div className='flex justify-between'>
                        <div className='text-sm'>
                            <p className='font-[500]'>Mwesigwa Christopher</p>
                            <p>+256758085749</p>
                            <p>City, street</p>
                            <p>state, country, zip</p>
                        </div>
                        <BsChevronRight onClick={toggleAddressMenu} className='m-2'/>
                    </div>
                </section>
                <section className='px-3 py-2 bg-white'>
                    <p className='font-bold text-md py-2'>Payment methods</p>
                    <div className='flex gap-2 items-center text-sm'>
                        <MdRadioButtonChecked onClick={toggleAddressMenu} className='m-2'/>
                        <p>Cash On Delivery</p>
                    </div>
                    <div className='flex gap-2 items-center text-gray-300'>
                        <MdRadioButtonUnchecked onClick={toggleAddressMenu} className='m-2'/>
                        <div>
                            <div className='flex gap-2'>
                                <RiBankCardLine size={24} className='border rounded'/>
                                <div className='text-sm font-[600]'>Add a new card</div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <p className='text-xs'><span className='font-bold text-red-400'>Note: </span> Ensure to have changed money if you are paying with cash, 
                            otherwise, use cashless(Momo pay, Airtel pay or direct transfer) or send 
                            the money to the number provided by the delivery agent</p>
                </section>
                <section className='flex overflow-auto px-3 py-2 bg-white snap-mandatory snap-x gap-3'>
                    { cart?.cartItems?.map((item, index) => {
                        const product = productDetails[item.productId];
                        return (
                            <section key={index} className='snap-center'>
                                <p className='font-bold text-md py-2 flex justify-between items-center text-green-700'>Nalmart Store <span><MdOutlineEditNote onClick={toggleAddressMenu} className='m-2 text-xl'/></span></p>
                                <div className='flex gap-2'>
                                    <div className='min-w-24 h-24 rounded-md bg-gray-200'>
                                        <img src={product?.photos[0]?.url} alt="" className='object-contain' />
                                    </div>
                                    <div>
                                        <p className='truncate w-[70vw] text-md'>{product?.name || "--"}</p>
                                        <p className='text-gray-400 text-sm'>{product?.category || "--"}</p>
                                        <div className='flex justify-between items-center mt-3'>
                                            <p className='font-bold'>UGX {product?.price?.toLocaleString() || "--"}</p>
                                            <p>{item?.quantity || "--"}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                    )})}
                </section>
                <div className='border-t border-gray-100 my-4 px-3 py-2 flex justify-between'>
                    <div>
                        <p className='text-sm font-bold'>Shipping: UGX {deliveryFee?.toLocaleString() || "--"}</p>
                        <p className='text-xs text-gray-500'>Estimated shipping time: 1-2 days</p>
                    </div>
                    <BsChevronRight onClick={toggleAddressMenu} className='m-2'/>
                </div>
                <section className='px-3 py-2 bg-white'>
                    <p className='font-bold text-md py-2'>Summary</p>
                    <p className='flex justify-between text-sm font-[500] border-b border-gray-100 py-2'>Subtotal <span>UGX {totalCost?.toLocaleString() || "--"}</span></p>
                    <p className='flex justify-between text-sm font-[500] border-b border-gray-100 py-2 text-gray-400 line-through'>Promo codes <span className='flex items-center'>Enter<BsChevronRight onClick={toggleAddressMenu} className=''/></span></p>
                    <p className='flex justify-between text-sm font-[500] border-b border-gray-100 py-2'>Shipping fee <span>UGX {deliveryFee?.toLocaleString() || "--"}</span></p>
                </section>
                <p className='py-3 text-gray-500 text-sm px-3 font-[400] bg-gray-100 mb-32'>Upon clicking 'Place Order', i confirm i have read and acknowledged all <a href="" className='text-blue-600'>terms and policies</a></p>
            </section>

            <div className='absolute bottom-0 bg-white shadow-2xl w-full py-4 px-3'>
                <p className='flex justify-between pb-2 font-bold'>Total <span>UGX {(totalCost + deliveryFee)?.toLocaleString() || "--"}</span></p>
                <div className='text-center bg-red-500 py-3 rounded-full text-white font-bold' onClick={handlePlaceOrder}>Place order</div>
            </div>
        </div>
        </div>

        {/* Desktop view */}
        <section className=''>
           
        </section>
    </>
  )
}

export default Checkout
