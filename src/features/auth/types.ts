export type RegistrationPayload = {
  username: string;
  password: string;
};

export interface Post {
  id: number;
  rating: number;
  desc: string;
  image: any;
  subtitle: string;
  title: string;
  authors: string;
  price: string;
  publisher: string;
  year: number;
  pages: number;
  language: string;
  format: string;
  isbn10: number;
  isbn13: number;
  error: number;
  url: any;
}
