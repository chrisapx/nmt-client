import React from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen px-4 md:hidden bg-white">
        <section className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-green-100 rounded-full">
            <MdVerifiedUser size={56} color="green" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Success</h1>
          <p className="text-center text-gray-600">
            Order placed successfully. Kindly view order for more details.
          </p>
        </section>

        <section className="mt-16 grid gap-2 w-full px-4">
            <div className='w-full text-center'>
                <button onClick={() => navigate('/order-details/' + orderId)} className="px-4 py-2 text-white bg-green-500 rounded-full shadow hover:bg-green-600">
                    View Order
                </button>
            </div>
          <Link to={'/'} className="my-8 w-full">
            <p className='text-center text-green-600'>Done</p>
          </Link>
        </section>
      </div>

      {/* Desktop view */}
      <section className="">
        {/* Add desktop-specific styles here if needed */}
      </section>
    </>
  );
};

export default OrderSuccess;