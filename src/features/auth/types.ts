export type RegistrationPayload = {
  username: string;
  password: string;
};

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

export type Tokens = {
  access: string;
  refresh: string;
};

export type PostsResponse = {
  error: string;
  total: string;
  books: Book[];
};

export type SelectedPost = {
  error: number;
  title: string;
  subtitle: string;
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

// export type PostResponse = {
//   book: Response[];
// };

export type Response = {
  error: number;
  title: string;
  subtitle: string;
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
  pdf: any;
};

export type SeachBooks = {
  error: string;
  page: string;
  total: string;
  books: Book[];
};
