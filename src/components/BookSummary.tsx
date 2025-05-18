import { X } from 'lucide-react';
import { Book } from '../types/book';
import StarRating from './StarRating';

interface BookSummaryProps {
  book: Book;
  onClose: () => void;
  userRating?: number;
  onRate?: (rating: number) => void;
}

export default function BookSummary({ book, onClose, userRating, onRate }: BookSummaryProps) {
  const {
    volumeInfo: {
      title,
      authors,
      description,
      imageLinks,
      averageRating,
      categories,
      pageCount,
      publishedDate
    }
  } = book;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img
                src={imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=500&q=60'}
                alt={title}
                className="w-full rounded-lg shadow-md"
              />
              
              <div className="mt-4 space-y-2">
                {authors && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Author(s):</span> {authors.join(', ')}
                  </p>
                )}
                {publishedDate && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Published:</span> {new Date(publishedDate).getFullYear()}
                  </p>
                )}
                {pageCount && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Pages:</span> {pageCount}
                  </p>
                )}
                {categories && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Categories:</span> {categories.join(', ')}
                  </p>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-2/3 space-y-4">
              <div className="flex items-center gap-4">
                {averageRating && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                    <StarRating rating={averageRating} size="md" />
                  </div>
                )}
                {userRating !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Your Rating</p>
                    <StarRating 
                      rating={userRating} 
                      onRate={onRate}
                      size="md"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {description || 'No description available.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}