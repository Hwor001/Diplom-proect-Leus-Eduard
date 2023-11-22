import { baseUrl, jsonContentTypeHeaders } from '../../api/constants';
import { PostsResponse } from './types';

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
