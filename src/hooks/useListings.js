import { useState, useEffect, useMemo, useCallback } from 'react';
import { api_urls } from '../components/utils/ResourceUrls';

export function useListings(page = 0, size = 10, filters = {}, reload, admin) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const stableFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(api_urls.items.get_all(page, size));
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
  
      if(admin){
        setListings(data);
      } else {
        setListings((prev) => {
          const uniqueItems = [...prev, ...data].filter(
            (item, index, array) =>
              array.findIndex((i) => i.id === item.id) === index
          );
          return uniqueItems;
        });
      }
  
      setHasMore(data.length === size);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'An error occurred');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, size]);
  

  const fetchItem = async (itemId) => {
      setLoading(true);
      try {
        const response = await fetch(api_urls.items.get_by_id(itemId));
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data;
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
  useEffect(() => {
    fetchItems();
  }, [page, size, stableFilters, reload, fetchItems]);

  return { listings, fetchItem, loading, hasMore, error };
}