import { baseUrl, jsonContentTypeHeaders } from '../../api/constants';
import { Response } from './types';

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
