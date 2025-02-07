import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../global/Toast';
import { api_urls } from '../../components/utils/ResourceUrls';
import { getUserToken, isAuthenticated } from '../../components/utils/AuthCookiesManager';
import { dialog_operations } from '../../components/utils/constansts/DialogOperations';
import { useAuthDialog } from '../../hooks/useAuthDialog';
import LoaderIcon from '../../global/LoaderIcon';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const [reloadCart, setReloadCart] = useState(false);
  const { addItemToCart, cart } = useCart(reloadCart);
  const { openDialog } = useAuthDialog();
  const [isLoading, setIsLoading] = useState("");

  const handleAddToCart = async () => {
    setIsLoading(item.itemId);
    try{
      const token = getUserToken();
      const cartPayload = {
        cartItems: [
          {
            productId: item?.itemId,
            quantity: 1,      
          },
        ],
      };
      const response = await fetch(api_urls.carts.create, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
          },
          body: JSON.stringify(cartPayload)
      });

      if(response.ok){
        const res = await response.json();
        console.log(res);
        showToast(item.name + " added to cart", "success");
      } else {
          showToast((await response.text()).toString(), "error");
      }
      
    } catch (error) {
        showToast(error.toString(), "error");
    } finally {
        setReloadCart(!reloadCart);
        setIsLoading("");
    }
  }

  return (
    <article className='mb-4 shadow rounded-lg flex flex-col justify-between'>
        <div className='relative rounded-lg '>
            <img src={item?.photos[0]?.url} alt={item.name} className='object-cover bg-gray-50 truncate rounded-t-lg' width={'100%'} height={'100%'}/>
        </div>
        <section>
          <section className='pb-2 px-2' onClick={() => navigate(`/details/${item.itemId}`)}>
              <p className='text-xs font-bold'>UGX <span className='text-lg'>{item.price.toLocaleString() || 0.0}</span></p>
              <p className='text-xs'>{item.stockCount} pcs in stock</p>
              <p className='truncate text-sm' title={item.name}>{item.name || "No Name"}</p>
          </section>
          <p className='hover:bg-red-400 shadow bg-red-500 text-center text-sm font-bold text-white py-2 mx-2 mb-2 rounded-md'>
            { isLoading === item.itemId ? 
                <LoaderIcon/> :  isAuthenticated() ? 
                  <p onClick={() => handleAddToCart()}>Add To Cart</p> : <p onClick={() => openDialog(dialog_operations.login)}>Login to order</p> }
          </p>
        </section>
    </article >
  )
}

export default ProductCard
