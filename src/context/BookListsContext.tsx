import { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types/book';

interface BookRating {
  bookId: string;
  rating: number;
}

interface BookLists {
  favorites: Book[];
  readingList: Book[];
  ratings: BookRating[];
}

interface BookListsContextType {
  bookLists: BookLists;
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (bookId: string) => void;
  addToReadingList: (book: Book) => void;
  removeFromReadingList: (bookId: string) => void;
  isInFavorites: (bookId: string) => boolean;
  isInReadingList: (bookId: string) => boolean;
  rateBook: (bookId: string, rating: number) => void;
  getUserRating: (bookId: string) => number | undefined;
}

const BookListsContext = createContext<BookListsContextType | undefined>(undefined);

export function BookListsProvider({ children }: { children: ReactNode }) {
  const [bookLists, setBookLists] = useState<BookLists>({
    favorites: [],
    readingList: [],
    ratings: []
  });

  const addToFavorites = (book: Book) => {
    setBookLists(prev => ({
      ...prev,
      favorites: [...prev.favorites, book]
    }));
  };

  const removeFromFavorites = (bookId: string) => {
    setBookLists(prev => ({
      ...prev,
      favorites: prev.favorites.filter(book => book.id !== bookId)
    }));
  };

  const addToReadingList = (book: Book) => {
    setBookLists(prev => ({
      ...prev,
      readingList: [...prev.readingList, book]
    }));
  };

  const removeFromReadingList = (bookId: string) => {
    setBookLists(prev => ({
      ...prev,
      readingList: prev.readingList.filter(book => book.id !== bookId)
    }));
  };

  const isInFavorites = (bookId: string) => {
    return bookLists.favorites.some(book => book.id === bookId);
  };

  const isInReadingList = (bookId: string) => {
    return bookLists.readingList.some(book => book.id === bookId);
  };

  const rateBook = (bookId: string, rating: number) => {
    setBookLists(prev => ({
      ...prev,
      ratings: [
        ...prev.ratings.filter(r => r.bookId !== bookId),
        { bookId, rating }
      ]
    }));
  };

  const getUserRating = (bookId: string) => {
    return bookLists.ratings.find(r => r.bookId === bookId)?.rating;
  };

  return (
    <BookListsContext.Provider value={{
      bookLists,
      addToFavorites,
      removeFromFavorites,
      addToReadingList,
      removeFromReadingList,
      isInFavorites,
      isInReadingList,
      rateBook,
      getUserRating
    }}>
      {children}
    </BookListsContext.Provider>
  );
}

export function useBookLists() {
  const context = useContext(BookListsContext);
  if (context === undefined) {
    throw new Error('useBookLists must be used within a BookListsProvider');
  }
  return context;
}