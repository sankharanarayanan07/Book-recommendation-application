import { useState } from 'react';
import { Book } from '../types/book';
import { ExternalLink, Heart, BookOpen } from 'lucide-react';
import { useBookLists } from '../context/BookListsContext';
import { useAuth } from '../context/AuthContext';
import StarRating from './StarRating';
import BookSummary from './BookSummary';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [showSummary, setShowSummary] = useState(false);
  const { user } = useAuth();
  const {
    isInFavorites,
    isInReadingList,
    addToFavorites,
    removeFromFavorites,
    addToReadingList,
    removeFromReadingList,
    rateBook,
    getUserRating
  } = useBookLists();

  const {
    volumeInfo: {
      title,
      authors,
      description,
      imageLinks,
      averageRating,
      categories
    },
    saleInfo
  } = book;

  const userRating = getUserRating(book.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInFavorites(book.id)) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  const handleReadingListClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInReadingList(book.id)) {
      removeFromReadingList(book.id);
    } else {
      addToReadingList(book);
    }
  };

  const handleRate = (rating: number) => {
    rateBook(book.id, rating);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
        onClick={() => setShowSummary(true)}
      >
        <div className="relative h-48">
          <img
            src={imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=500&q=60'}
            alt={title}
            className="w-full h-full object-cover"
          />
          {categories?.[0] && (
            <span className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
              {categories[0]}
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{title}</h3>
          <p className="text-gray-600 mb-2 text-sm">{authors?.join(', ') || 'Unknown Author'}</p>
          
          <div className="flex items-center gap-4 mb-2">
            {averageRating && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Average:</span>
                <StarRating rating={averageRating} size="sm" />
              </div>
            )}
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Your rating:</span>
                <StarRating 
                  rating={userRating || 0} 
                  onRate={(rating) => {
                    handleRate(rating);
                  }}
                  size="sm"
                />
              </div>
            )}
          </div>
          
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">
            {description || 'No description available'}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {user && (
                <>
                  <button
                    onClick={handleFavoriteClick}
                    className={`p-2 rounded-full transition-colors ${
                      isInFavorites(book.id)
                        ? 'bg-red-100 text-red-500'
                        : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isInFavorites(book.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleReadingListClick}
                    className={`p-2 rounded-full transition-colors ${
                      isInReadingList(book.id)
                        ? 'bg-purple-100 text-purple-500'
                        : 'bg-gray-100 text-gray-500 hover:bg-purple-50 hover:text-purple-500'
                    }`}
                  >
                    <BookOpen className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {saleInfo?.buyLink && (
              <a
                href={saleInfo.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                Buy Now
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {showSummary && (
        <BookSummary
          book={book}
          onClose={() => setShowSummary(false)}
          userRating={userRating}
          onRate={handleRate}
        />
      )}
    </>
  );
}