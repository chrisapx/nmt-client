import React, { useEffect, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

const Counter = ({ count, onChange }) => {
  const [_count, setCount] = useState(count);

  useEffect(() => {
    setCount(count);
  }, [count]);

  const handleIncrement = () => {
    const newCount = _count + 1;
    setCount(newCount);
    if (onChange) onChange(newCount);
  };

  const handleDecrement = () => {
    if (_count > 1) {
      const newCount = _count - 1;
      setCount(newCount);
      if (onChange) onChange(newCount);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <div
        onClick={handleDecrement}
        className={`cursor-pointer p-1 rounded ${
          _count > 1 ? 'bg-gray-200' : 'text-gray-400 bg-gray-100'
        } rounded-full`}
      >
        <BiMinus />
      </div>
      <p className="text-md">{_count}</p>
      <div
        onClick={handleIncrement}
        className="cursor-pointer p-1 rounded bg-gray-200 rounded-full"
      >
        <BiPlus />
      </div>
    </div>
  );
};

export default Counter;