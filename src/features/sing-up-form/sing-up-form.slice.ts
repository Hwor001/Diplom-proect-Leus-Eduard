import { createSlice } from '@reduxjs/toolkit';

const singUpFormSlice = createSlice({
  name: 'singUpForm',
  initialState: {
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmedPassword: '',
  },
  reducers: {
    setName(state, action: { payload: (typeof state)['name'] }) {
      state.name = action.payload;
    },
    setEmail(state, action: { payload: (typeof state)['email'] }) {
      state.email = action.payload;
    },
    setPassword(state, action: { payload: (typeof state)['password'] }) {
      state.password = action.payload;
    },
    setNewPassword(state, action: { payload: (typeof state)['newPassword'] }) {
      state.newPassword = action.payload;
    },
    setConfirmedPassword(
      state,
      action: { payload: (typeof state)['confirmedPassword'] }
    ) {
      state.confirmedPassword = action.payload;
    },
  },
});

export const {
  actions: {
    setName,
    setEmail,
    setPassword,
    setConfirmedPassword,
    setNewPassword,
  },
  reducer: signUpFormReducer,
} = singUpFormSlice;
