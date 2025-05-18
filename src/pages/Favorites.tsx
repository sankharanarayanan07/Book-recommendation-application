import { useBookLists } from '../context/BookListsContext';
import BookCard from '../components/BookCard';

export default function Favorites() {
  const { bookLists } = useBookLists();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-purple-900 mb-8">My Favorites</h1>
        
        {bookLists.favorites.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>You haven't added any books to your favorites yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookLists.favorites.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}