import { RegistrationPayload } from './types';

export const api = {
  register: (payload: RegistrationPayload) => {
    return new Promise<{ isOk: boolean }>((resolve) =>
      setTimeout(() => resolve({ isOk: true }), 3000)
    );
  },
};
