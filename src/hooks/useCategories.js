import { useState, useEffect, useMemo } from 'react';
import { api_urls } from '../components/utils/ResourceUrls';

export function useCategoriess(page = 0, size = 10, parentId, reload) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const url = parentId ? 
            api_urls.items.categories.get_subCategories(parentId) : api_urls.items.categories.get_all
        const response = await fetch(url);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        setCategories((prev) => {
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

    fetchCategories();
  }, [page, size, reload]);

  return { categories, loading, hasMore, error };
}