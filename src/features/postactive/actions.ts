import { createAction } from '@reduxjs/toolkit';

export const selectImage = createAction<string>('post/selectImage');

export const selectPost = (post: any) => ({
  type: 'SELECT_POST',
  payload: post,
});
