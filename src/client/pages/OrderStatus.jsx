import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { isAuthenticated } from "../../components/utils/AuthCookiesManager";
import { useNavigate } from "react-router-dom";

const OrderStatus = () => {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState("SHIPPED");

  const steps = [
    { label: "PLACED", description: "Your order has been placed successfully." },
    { label: "CONFIRMED", description: "Your order has been confirmed by the seller." },
    { label: "PACKED", description: "Your order has been packed and is ready to ship." },
    { label: "SHIPPED", description: "Your order is on its way to the delivery hub." },
    { label: "OUT_FOR_DELIVERY", description: "Your order is out for delivery." },
    { label: "DELIVERED", description: "Your order has been delivered successfully." },
  ];

  const currentIndex = steps.findIndex((step) => step.label === currentStatus);

  useEffect(() => {
    if(!isAuthenticated()){
        navigate('/');
    }
  })
  
  return (
    <div className="md:hidden h-screen">
      <section className="sticky top-0 px-3 py-2 bg-white shadow-sm">
        <Header showBack />
      </section>

      <p className="px-8 py-4 text-gray-500">Track order #{'ORD-29719928980801'}</p>

      <div className="relative px-8 mt-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start relative mb-8">
            {index !== steps.length - 1 && (
              <div
                className={`absolute left-3 top-7 h-full w-0.5 ${
                  index <= currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
            )}
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full ${
                index <= currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              {index <= currentIndex && (
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-4">
              <p
                className={`text-xs font-medium px-2 py-1 rounded w-fit ${
                  index <= currentIndex ? "text-white bg-blue-500" : "text-gray-600 bg-gray-200"
                }`}
              >
                {step.label.replace(/_/g, " ")}
              </p>
              <p className="text-xs text-gray-500 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {currentIndex === steps.length - 1 && (
        <p className="text-sm text-center text-green-600 mt-6">
          Your order has been delivered. Thank you for shopping with us!
        </p>
      )}
    </div>
  );
};

export default OrderStatus;