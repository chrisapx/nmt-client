import { useState, useEffect, useCallback } from 'react';
import { getUserToken, isAuthenticated } from '../components/utils/AuthCookiesManager';
import { api_urls } from '../components/utils/ResourceUrls';

const token = getUserToken();

export function useOrders(page = 0, size = 10, reload) {
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllOrders = useCallback(async () => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping fetchAllOrders.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(api_urls.orders.get_all_orders(page, size), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) setError(await response.text());
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Fetch all orders error:', err);
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllUserOrders = useCallback(async () => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping fetchAllOrders.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(api_urls.orders.get_user_orders, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) setError(await response.text());
      const data = await response.json();
      setUserOrders(data);
    } catch (err) {
      console.error('Fetch all orders error:', err);
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderById = async (orderId) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping fetchOrderById.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(api_urls.orders.get_by_id(orderId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) setError(await response.text());
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Fetch order by ID error:', err);
      setError(err.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderItems = async (orderId) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping fetch order items.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(api_urls.orders.get_items(orderId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) setError(await response.text());
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Fetch order by ID error:', err);
      setError(err.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderPayload) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping createOrder.");
      return;
    }
    try {
      const response = await fetch(api_urls.orders.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });
      if (!response.ok) setError(await response.text());
      const newOrder = await response.json();
      return newOrder;
    } catch (err) {
      console.error('Create order error:', err);
      setError(err.message || 'Failed to create order');
    }
  };

  const updateOrder = async (orderId, updatedOrder) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping updateOrder.");
      return;
    }
    try {
      const response = await fetch(api_urls.orders.update(orderId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedOrder),
      });
      if (!response.ok) setError(await response.text());
      const updatedOrderData = await response.json();
      return updatedOrderData;
    } catch (err) {
      console.error('Update order error:', err);
      setError(err.message || 'Failed to update order');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping deleteOrder.");
      return;
    }
    try {
      const response = await fetch(api_urls.orders.delete(orderId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) setError(await response.text());
      const res = await response.text();
      return res;
    } catch (err) {
      console.error('Delete order error:', err);
      setError(err.message || 'Failed to delete order');
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    if (!isAuthenticated()) {
      console.warn("User is not logged in. Skipping updateOrderStatus.");
      return;
    }
    try {
      const response = await fetch(api_urls.orders.update_status(orderId, orderStatus), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) setError(await response.text());
      const newOrder = await fetchOrderById(orderId);
      return newOrder;
    } catch (err) {
      console.error('Update order status error:', err);
      setError(err.message || 'Failed to update order status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders, reload]);

  return {
    orders,
    userOrders,
    currentOrder,
    loading,
    error,
    fetchAllOrders,
    fetchAllUserOrders,
    fetchOrderItems,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
  };
}