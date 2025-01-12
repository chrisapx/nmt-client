import { useState, useEffect, useMemo } from 'react';
import { api_urls } from '../utils/ResourceUrls';

export function useListings(page = 0, size = 10, filters = {}, reload) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const stableFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(api_urls.items.get_all(page, size));
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        setListings((prev) => {
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

    fetchItems();
  }, [page, size, stableFilters, reload]);

  return { listings, loading, hasMore, error };
}