import { useState, useEffect, useMemo } from 'react';
import { getUserToken } from '../components/utils/AuthCookiesManager';
import { api_urls } from '../components/utils/ResourceUrls';
const token  = getUserToken();

export function useUsers(page = 0, size = 10, reload) {
  const [users, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(api_urls.users.get_all,
            { 
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            }
        );
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

    fetchUsers();
  }, [page, size, reload]);

  return { users, loading, hasMore, error };
}