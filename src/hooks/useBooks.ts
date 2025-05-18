import { useState, useEffect } from 'react';
import { Book } from '../types/book';
import { FilterOptions } from '../components/Filters';

const API_KEY = 'AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU';

export function useBooks(searchQuery: string, filters: FilterOptions) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery.trim()) {
        setBooks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          q: `${searchQuery}${filters.category ? `+subject:${filters.category}` : ''}`,
          orderBy: filters.orderBy,
          maxResults: filters.maxResults.toString(),
          key: API_KEY
        });

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${queryParams}`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        setBooks(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch books');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchBooks, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, filters]);

  return { books, loading, error };
}