import { baseUrl, jsonContentTypeHeaders } from '../../api/constants';
import { PostsResponse, Response, SeachBooks } from './types';

export const allPostsApi = {
  getAllPosts: (): Promise<PostsResponse> => {
    return fetch(baseUrl + '/new', {
      method: 'GET',
      headers: {
        ...jsonContentTypeHeaders,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('SERVER ERROR');
      }
      return response.json();
    });
  },
};

export const bookApi = {
  getBookByIsbn: (isbn13: string): Promise<Response> => {
    return fetch(`${baseUrl}/books/${isbn13}`, {
      method: 'GET',
      headers: {
        ...jsonContentTypeHeaders,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('SERVER ERROR');
      }
      return response.json();
    });
  },
};

export const searchBookApi = {
  searchBooks: (searchText: string, page: number): Promise<SeachBooks> => {
    return fetch(`${baseUrl}/search/${searchText}/${page}`).then((response) => {
      if (!response.ok) {
        throw new Error('SERVER ERROR');
      }
      return response.json();
    });
  },
};

export const searchBooksApi = {
  fetchBooks: (
    searchResultsText: string,
    page: number
  ): Promise<SeachBooks> => {
    return fetch(`${baseUrl}/search/${searchResultsText}/${page}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error('SERVER ERROR');
        }
        return response.json();
      }
    );
  },
};

export const popularBooksApi = {
  fetchBooks: (page: number): Promise<SeachBooks> => {
    return fetch(`${baseUrl}/search/popular/${page}`).then((response) => {
      if (!response.ok) {
        throw new Error('SERVER ERROR');
      }
      return response.json();
    });
  },
};

export const similarBooksApi = {
  similarBooks: (searchQuery: string): Promise<SeachBooks> => {
    return fetch(`${baseUrl}/search/?q=${searchQuery}`).then((response) => {
      if (!response.ok) {
        throw new Error('SERVER ERROR');
      }
      return response.json();
    });
  },
};
