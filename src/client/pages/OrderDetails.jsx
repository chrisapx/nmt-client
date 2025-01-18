import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../../components/utils/AuthCookiesManager';
import { useOrders } from '../../hooks/useOrders';
import { addDays, formatDate, formatDateTime } from '../../components/utils/FormatingHelpers';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { fetchOrderItems, fetchOrderById } = useOrders();
  const [order, setOrder] = useState();
  const [orderItems, setOrderItems] = useState();

  useEffect(() => {
    const fetchDetails = async () => {
      setOrder(await fetchOrderById(orderId));
      setOrderItems(await fetchOrderItems(orderId));
    }

    fetchDetails();
  }, [orderId])

  useEffect(() => {
    if(!isAuthenticated()){
        navigate('/');
    }
  })

  // const formatDate = (timestamp) =>
  //   new Intl.DateTimeFormat('en-GB', {
  //     dateStyle: 'medium',
  //     timeStyle: 'short',
  //   }).format(timestamp);

  // const formatDateTime = (timestamp) =>
  //   new Intl.DateTimeFormat('en-GB', {
  //     dateStyle: 'medium',
  //     timeStyle: 'short',
  //   }).format(new Date(timestamp));
    
  return (
    <>
      <div className="md:hidden h-screen">
        <section className="sticky top-0 px-3 pb-2 bg-white shadow-sm">
          <Header showBack />
        </section>

        <section className="grid gap-2 bg-gray-100 mt-4">
          <div className="bg-white px-3 py-2">
            <p className="font-bold flex justify-between">Order ID <p className='underline'>#{orderId}</p></p>
            <p className="text-gray-600">
              Placed on: {order?.createdAt ? formatDateTime(order.createdAt) : 'N/A'}
            </p>
          </div>

          <div className="bg-white px-3 py-2 flex flex-col gap-3">
            <p className="font-[400] text-white bg-green-500 px-4 rounded w-fit">
              PENDING
            </p>
            <p className="text-gray-700">Items ({order?.cart.cartItems?.length || '0'})</p>
          </div>

          <section className="flex overflow-auto px-3 py-2 bg-white snap-mandatory snap-x gap-3">
            {order?.cart?.cartItems?.map((item, index) => {
              const product = {};
              return (
              <section key={index} className="snap-center">
                <div className="flex gap-3">
                  <div className="min-w-24 h-24 rounded-md bg-gray-200">
                    <img src={ ""} alt={item.name} className="h-full w-full object-cover rounded-md" />
                  </div>
                  <div>
                    <p className="truncate w-[70vw] text-md font-semibold">{item?.name || "--"}</p>
                    <p className="text-gray-400 text-sm">Variation: {item.variation || 'none'}</p>
                    <p className="text-gray-400 text-sm">Qty: {item?.quantity || "--"}</p>
                    <p className="font-bold">UGX {item?.price?.toLocaleString() || "--"}</p>
                  </div>
                </div>
              </section>
            )})}
          </section>

          <p
            className="text-center py-4 text-orange-400 font-medium bg-white cursor-pointer"
            onClick={() => navigate(`/order-status/${order.orderId}`, { state: { order } })}
          >
            See order status
          </p>

          <section className="bg-white px-3 py-3">
            <p className="py-2 font-medium">Payment Method</p>
            <p className="font-thin">Cash On Delivery (Pay with Mobile Money, cash, or direct transfer)</p>

            <p className="py-2 font-medium">Payment Summary</p>
            <p className="font-thin">Items total: UGX {order?.totalAmount?.toLocaleString() || "--"}</p>
            <p className="font-thin">Delivery fees: UGX {order?.shippingFee.toLocaleString() || "--"}</p>
            <p className="font-thin pt-2">Total: UGX {(order?.totalAmount + order?.shippingFee).toLocaleString() || "--"}</p>
          </section>

          <section className="bg-white px-3 py-3">
            <p className="py-2 font-medium flex justify-between">
              Delivery mode
              <span className="font-thin text-sm">
                Delivered on {order?.createdAt ? formatDate(addDays(new Date(order.createdAt), 2)) : 'N/A'}
              </span>

            </p>
            <p className="font-thin">Door Delivery</p>

            <p className="font-bold text-md py-2">Shipping Address</p>
            <div>
              {/* <p className="font-thin">Mwesigwa Christopher</p>
              <p className="font-thin">+256758085749</p>
              <p className="font-thin">City, Street</p>
              <p className="font-thin">State, Country, ZIP</p> */}
              <p>No Adress available</p>
            </div>
          </section>
        </section>
        
      </div>

      {/* Desktop View Placeholder */}
      <section className="">
      </section>
    </>
  );
};

export default OrderDetails;