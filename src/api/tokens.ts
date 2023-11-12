import { Tokens } from '../features/auth/types';

export function setTokens(payload: Tokens) {
  localStorage.setItem('tokens', JSON.stringify(payload));
}

export function getTokens(): Tokens | null {
  const value = localStorage.getItem('tokens');
  if (value) {
    return JSON.parse(value);
  }
  return null;
}
