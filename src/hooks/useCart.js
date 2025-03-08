import { useState, useEffect, useCallback } from 'react';
import { getUserToken, isAuthenticated } from '../components/utils/AuthCookiesManager';
import { api_urls } from '../components/utils/ResourceUrls';
import { showToast } from '../global/Toast';

const token = getUserToken();

export function useCart(reload) {
  const [cart, setCart] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping fetchCart.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(api_urls.carts.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems: []})
      });
      if (!response.ok) {
        console.warn(await response.text());
      } else {
        const data = await response.json();
        console.log(data)
        setCart(data);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [reload]);

  const addItemToCart = async (cartPayload) => {
    if (!isAuthenticated()) {
      console.warn("Operation not allowed. User is not logged in");
      return;
    }
    try {
      const response = await fetch(api_urls.carts.add_item, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartPayload),
      });
      if (!response.ok) {
        setError(await response.text());
        return;
      }
      const updatedCart = await response.json();
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error('Add item error:', err);
      setError(err.message || 'Failed to add item to cart');
    }
  };

  const getCartItems = async (cartId) => {
    if (!isAuthenticated()) {
      console.warn("Operation not allowed. User is not logged in");
      return;
    }
    setLoading(true);
    console.log("Fetching products-------------");
    try {
      const response = await fetch(api_urls.carts.get_cart_items(cartId), {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        const error = await response.text();
        setError(error);
        showToast(error);
        return;
      }

      const products = await response.json();

      console.log("Fetched already-------------" + products)
      return products;
    } catch (err) {
      console.error('Fetch cart items error:', err);
      setError(err.message || 'Failed fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (cartItemId) => {
    if (!isAuthenticated() || !cart?.cartId) {
      console.warn("Operation not allowed. User is not logged in or cart does not exist.");
      return;
    }
    try {
      const response = await fetch(`${api_urls.carts.remove_item(cartItemId)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError(await response.text());
        return;
      }
      fetchCart();
    } catch (err) {
      console.error('Remove item error:', err);
      setError(err.message || 'Failed to remove item from cart');
    }
  };

  const updateCartItemQuantity = async (cartItemId, quantity) => {
    if (!isAuthenticated() || !cart?.cartId) {
      console.warn("Operation not allowed. User is not logged in or cart does not exist.");
      return;
    }
    try {
      const response = await fetch(`${api_urls.carts.set_item_quantity(cartItemId, quantity)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError(await response.text());
        return;
      }
      fetchCart();
    } catch (err) {
      console.error('Update quantity error:', err);
      setError(err.message || 'Failed to update item quantity');
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated() || !cart?.cartId) {
      console.warn("Operation not allowed. User is not logged in or cart does not exist.");
      return;
    }
    try {
      const response = await fetch(api_urls.carts.clear_cart(cart.cartId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError(await response.text());
        return;
      }
      fetchCart();
    } catch (err) {
      console.error('Clear cart error:', err);
      setError(err.message || 'Failed to clear the cart');
    }
  };

  const getCartTotalCost = async () => {
    if (!isAuthenticated() || !cart?.cartId) {
      console.warn("Operation not allowed. User is not logged in or cart does not exist.");
      return;
    }
    try {
      const response = await fetch(api_urls.carts.get_cart_total_cost(cart.cartId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError(await response.text());
        return;
      };
      const _totalCost = await response.json();
      setTotalCost(_totalCost);
      return _totalCost;
    } catch (err) {
      console.error('Get total cost error:', err);
      setError(err.message || 'Failed to retrieve total cost');
    }
  };

  const getTotalCartItemCount = async () => {
    if (!isAuthenticated() || !cart?.cartId) {
      console.warn("Operation not allowed. User is not logged in or cart does not exist.");
      return;
    }
    try {
      const response = await fetch(api_urls.carts.get_item_count, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError(await response.text());
        return;
      }
      const count = await response.json();
      setTotalCount(count);
      return count;
    } catch (err) {
      console.error('Get total cart items error:', err);
      setError(err.message || 'Failed to retrieve total cart items');
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (cart?.cartId) {
      getTotalCartItemCount();
      getCartTotalCost();
    }
  }, [cart]);

  return {
    cart,
    totalCount,
    totalCost,
    loading,
    error,
    fetchCart,
    getCartItems,
    addItemToCart,
    removeItemFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotalCost,
    getTotalCartItemCount,
  };
}