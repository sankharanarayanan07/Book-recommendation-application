import { Search } from 'lucide-react';
import { useState } from 'react';
import VoiceSearch from '../components/VoiceSearch';
import BookCard from '../components/BookCard';
import Filters, { FilterOptions } from '../components/Filters';
import { useBooks } from '../hooks/useBooks';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    orderBy: 'relevance',
    maxResults: 9
  });

  const { books, loading, error } = useBooks(searchQuery, filters);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-4">
            Discover Your Next Great Read
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore thousands of books and find your perfect match with our intelligent recommendation system
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-2">
            <div className="flex-1 flex items-center bg-gray-50 rounded-md">
              <Search className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books, authors, or genres..."
                className="flex-1 p-3 bg-transparent focus:outline-none"
              />
            </div>
            <VoiceSearch onSearchChange={setSearchQuery} />
          </div>
        </div>

        <Filters onFilterChange={setFilters} />

        {error && (
          <div className="text-red-600 text-center mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-600">
            Loading books...
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : searchQuery && (
          <div className="text-center text-gray-600">
            No books found. Try adjusting your search or filters.
          </div>
        )}
      </div>
    </div>
  );
}