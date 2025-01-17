import { useState, useEffect, useCallback } from 'react';
import { getUserToken, isAuthenticated } from '../components/utils/AuthCookiesManager';
import { api_urls } from '../components/utils/ResourceUrls';

const token = getUserToken();

export function useCart() {
  const [cart, setCart] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping fetchCart.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(api_urls.carts.get_open_cart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      console.log("Cart is: " + data);
      setCart(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItemToCart = async (cartPayload) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping Cart addition.");
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
      if (!response.ok) throw new Error(await response.text());
      const updatedCart = await response.json();
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error('Add item error:', err);
      setError(err.message || 'Failed to add item to cart');
    }
  };

  const removeItemFromCart = async (cartItemId) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping remove from cart.");
      return;
    }
    try {
      const response = await fetch(`${api_urls.carts.remove_item(cartItemId)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      fetchCart();
    } catch (err) {
      console.error('Remove item error:', err);
      setError(err.message || 'Failed to remove item from cart');
    }
  };

  const updateCartItemQuantity = async (cartItemId, quantity) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping update item quantity.");
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
      if (!response.ok) throw new Error(await response.text());
      fetchCart();
    } catch (err) {
      console.error('Update quantity error:', err);
      setError(err.message || 'Failed to update item quantity');
    }
  };

  const clearCart = async (cartId) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping clear cart.");
      return;
    }
    try {
      const response = await fetch(api_urls.carts.clear_cart(cartId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      fetchCart();
    } catch (err) {
      console.error('Clear cart error:', err);
      setError(err.message || 'Failed to clear the cart');
    }
  };

  const getCartTotalCost = async (cartId) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping get total cost.");
      return;
    }
    try {
      const response = await fetch(api_urls.carts.get_cart_total_cost(cartId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      const totalCost = await response.json();
      return totalCost;
    } catch (err) {
      console.error('Get total cost error:', err);
      setError(err.message || 'Failed to retrieve total cost');
    }
  };

  const getTotalCartItemCount = async (cartId) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping get count.");
      return;
    }
    try {
      const response = await fetch(api_urls.carts.get_item_count, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(await response.text());
      const count = await response.json();
      setTotalCount(count);
      return count;
    } catch (err) {
      console.error('Get total cart itens error:', err);
      setError(err.message || 'Failed to retrieve total cart items');
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    getTotalCartItemCount();
  }, [cart]);

  return {
    cart,
    totalCount,
    loading,
    error,
    fetchCart,
    addItemToCart,
    removeItemFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotalCost,
    getTotalCartItemCount
  };
}