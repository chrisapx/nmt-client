import React, { useState } from 'react';
import Header from '../../components/header/Header';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [items, setItems] = useState([
    { itemId: 1, selected: true, name: 'Hot same resistant power bank', category: 'Electrical and fragile', price: 76000, quantity: 1, image: 'https://via.placeholder.com/150' },
    { itemId: 2, selected: false, name: 'Durable phone case', category: 'Impact-resistant and stylish', price: 25000, quantity: 1, image: 'https://via.placeholder.com/150' },
    { itemId: 3, selected: true, name: 'Wireless headphones', category: 'Noise-cancelling technology', price: 150000, quantity: 1, image: 'https://via.placeholder.com/150' },
  ]);

  const itemsTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFees = 5000;
  const totalCost = itemsTotal + deliveryFees;

  const formatDate = (timestamp) =>
    new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(timestamp);

  return (
    <>
      <div className="md:hidden h-screen">
        <section className="sticky top-0 px-3 py-2 bg-white shadow-sm">
          <Header showBack />
        </section>

        <section className="grid gap-2 bg-gray-100 mt-4">
          <div className="bg-white px-3 py-2">
            <p className="font-bold">Order #{'792898020'}</p>
            <p className="text-gray-600">Placed on: {formatDate(Date.now())}</p>
          </div>

          <div className="bg-white px-3 py-2 flex flex-col gap-3">
            <p className="font-[400] text-white bg-green-500 px-4 rounded w-fit">
              PENDING
            </p>
            <p className="text-gray-700">Items ({items?.length})</p>
          </div>

          <section className="flex overflow-auto px-3 py-2 bg-white snap-mandatory snap-x gap-3">
            {items.map((item, index) => (
              <section key={index} className="snap-center">
                <div className="flex gap-3">
                  <div className="min-w-24 h-24 rounded-md bg-gray-200">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-md" />
                  </div>
                  <div>
                    <p className="truncate w-[70vw] text-md font-semibold">{item.name}</p>
                    <p className="text-gray-400 text-sm">Variation: {item.variation || 'none'}</p>
                    <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    <p className="font-bold">UGX {item.price.toLocaleString()}</p>
                  </div>
                </div>
              </section>
            ))}
          </section>

          <p
            className="text-center py-4 text-orange-400 font-medium bg-white cursor-pointer"
            onClick={() => navigate(`/order-status/${orderId}`)}
          >
            See order status
          </p>

          <section className="bg-white px-3 py-3">
            <p className="py-2 font-medium">Payment Method</p>
            <p className="font-thin">Cash On Delivery (Pay with Mobile Money, cash, or direct transfer)</p>

            <p className="py-2 font-medium">Payment Summary</p>
            <p className="font-thin">Items total: UGX {itemsTotal.toLocaleString()}</p>
            <p className="font-thin">Delivery fees: UGX {deliveryFees.toLocaleString()}</p>
            <p className="font-thin pt-2">Total: UGX {totalCost.toLocaleString()}</p>
          </section>

          <section className="bg-white px-3 py-3">
            <p className="py-2 font-medium flex justify-between">
              Delivery mode<span className="font-thin text-sm">Delivered on {formatDate(Date.now())}</span>
            </p>
            <p className="font-thin">Door Delivery</p>

            <p className="font-bold text-md py-2">Shipping Address</p>
            <div>
              <p className="font-thin">Mwesigwa Christopher</p>
              <p className="font-thin">+256758085749</p>
              <p className="font-thin">City, Street</p>
              <p className="font-thin">State, Country, ZIP</p>
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