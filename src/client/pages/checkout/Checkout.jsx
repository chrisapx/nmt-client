import React from 'react'
import { useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { MdOutlineEditNote, MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { RiBankCardLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import Counter from '../../components/Counter'

const Checkout = () => {
    const [itemCount, setItemCount] = useState(1);
    const [order, setOrder] = useState({});

  const handleCountChange = (newCount) => {
    setItemCount(newCount);
    console.log('Updated count:', newCount);
  };
    const toggleAddressMenu = () => {

    }

    const handlePlaceOrder = () => {
        confirm("Are you sure you want to place the order");
    }

    const items = [
        {
            id: 1,
            name: 'Hot same resistant power bank',
            description: 'Electrical and fragile',
            price: 76000,
            quantity: 1,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Durable phone case',
            description: 'Impact-resistant and stylish',
            price: 25000,
            quantity: 1,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            name: 'Wireless headphones',
            description: 'Noise-cancelling technology',
            price: 150000,
            quantity: 1,
            image: 'https://via.placeholder.com/150',
        },
    ];

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
                    {/* Map through the list of items and display them in courosel format being able to scroll swipe through them left and right */}
                    { items.map((item, index) => (
                        <section key={index} className='snap-center'>
                            <p className='font-bold text-md py-2 flex justify-between items-center'>Store name <span><MdOutlineEditNote onClick={toggleAddressMenu} className='m-2 text-xl'/></span></p>
                            <div className='flex gap-2'>
                                <div className='min-w-24 h-24 rounded-md bg-gray-200'>
                                    <img src="" alt="" />
                                </div>
                                <div>
                                    <p className='truncate w-[70vw] text-md'>Hot same resistant power bank, suitable for all terrains of all regions</p>
                                    <p className='text-gray-400 text-sm'>Electrical and fragile</p>
                                    <div className='flex justify-between items-center mt-3'>
                                        <p className='font-bold'>UGX 76,000</p>
                                        <Counter count={itemCount} onChange={handleCountChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='border-t border-gray-100 my-4 py-2 flex justify-between'>
                                <div>
                                    <p className='text-sm font-bold'>Shipping: UGX 287,828</p>
                                    <p className='text-xs text-gray-500'>Estimated shipping time: 1-2 days</p>
                                </div>
                                <BsChevronRight onClick={toggleAddressMenu} className='m-2'/>
                            </div>
                        </section>
                    ))}
                </section>
                <section className='px-3 py-2 bg-white'>
                    <p className='font-bold text-md py-2'>Summary</p>
                    <p className='flex justify-between text-sm font-[500] border-b border-gray-100 py-2'>Subtotal <span>UGX {(288932).toLocaleString()}</span></p>
                    <p className='flex justify-between text-sm font-[500] border-b border-gray-100 py-2'>Promo codes <span className='flex items-center'>Enter<BsChevronRight onClick={toggleAddressMenu} className=''/></span></p>
                    <p className='flex justify-between text-sm font-[500] border-b border-gray-100 py-2'>Shipping fee <span>UGX {(288932).toLocaleString()}</span></p>
                </section>
                <p className='py-3 text-gray-500 text-sm px-3 font-[400] bg-gray-100 mb-32'>Upon clicking 'Place Order', i confirm i have read and acknowledged all <a href="" className='text-blue-600'>terms and policies</a></p>
            </section>

            <div className='absolute bottom-0 bg-white shadow-2xl w-full py-4 px-3'>
                <p className='flex justify-between pb-2 font-bold'>Total <span>UGX 288,283</span></p>
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
