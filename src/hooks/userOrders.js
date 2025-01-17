import { useState, useEffect, useMemo } from 'react';
import { getUserToken } from '../components/utils/AuthCookiesManager';
import { api_urls } from '../components/utils/ResourceUrls';
const token  = getUserToken();

export function useOrders(page = 0, size = 10, filters = {}, reload) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const stableFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(api_urls.orders.get_all,
            { 
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            }
        );
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        setOrders((prev) => {
          const uniqueItems = [...prev, ...data].filter(
            (item, index, array) =>
              array.findIndex((i) => i.id === item.id) === index
          );
          return uniqueItems;
        });

        if (data.length < size) setHasMore(false);
        console.log(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, size, stableFilters, reload]);

  return { orders, loading, hasMore, error };
}