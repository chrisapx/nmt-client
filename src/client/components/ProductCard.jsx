import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ item }) => {
  return (
    <Link to={`/details/${item.itemID}`} className='mb-4'>
        <div className='relative bg-gray-200 bg-gray-200 h-[25vh] rounded-lg'>
            <img src={item?.coverPhoto?.url} alt={item.name} className='object-cover bg-gray-200 truncate w-[100%] h-[100%] rounded-t-lg'/>
        </div>
        <section className='pb-2 px-2'>
            <p className='text-xs font-bold'>UGX <span className='text-lg'>{item.price.toLocaleString() || 0.0}</span></p>
            <p className='text-xs'>{item.stockCount} pcs in stock</p>
            <p className='truncate text-sm' title={item.name}>{item.name || "No Name"}</p>
        </section>
    </Link >
  )
}

export default ProductCard
