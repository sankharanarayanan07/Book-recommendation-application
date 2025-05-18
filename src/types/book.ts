export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate?: string;
    categories?: string[];
    pageCount?: number;
    averageRating?: number;
    saleInfo?: {
      buyLink?: string;
      retailPrice?: {
        amount: number;
        currencyCode: string;
      };
    };
  };
  saleInfo?: {
    buyLink?: string;
    retailPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
}