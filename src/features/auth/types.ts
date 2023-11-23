export interface Post {
  title: string;
  subtitle: string;
  isbn13: number;
  price: string;
  image: any;
  url: any;
}

export type Book = {
  title: string;
  subtitle: string;
  isbn13: number;
  price: string;
  image: any;
  url: any;
};

export type PostsResponse = {
  error: string;
  total: string;
  books: Book[];
};

export type Response = {
  error: number;
  title: string;
  subtitle?: string;
  authors: string;
  publisher: string;
  isbn10: number;
  isbn13: number;
  pages: number;
  year: number;
  rating: number;
  desc: string;
  price: string;
  image: any;
  url: any;
  language: string;
  format: string;
  pdf: any;
};

export type SeachBooks = {
  error: number;
  page: number;
  total: number;
  books: Book[];
};
