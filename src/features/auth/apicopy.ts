// import { PostsResponse, UserName } from '../../features/auth/types';
// import {
//   ActivationPayload,
//   AuthorizationPayload,
//   AuthorizationResponse,
//   RegistrationPayload,
// } from './types';
import { baseUrl, jsonContentTypeHeaders } from '../../api/constants';
import { PostsResponse } from './types';
// import { request } from '../../api/request';
// import { getTokens } from '../../api/tokens';

export const allPostsApi = {
  getAllPosts: (): Promise<PostsResponse> => {
    return fetch(baseUrl + 'new', {
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
