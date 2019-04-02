import Session from './session';

const TokenKey = 'wt_token';

export const getToken = () => Session.get(TokenKey);

export const setToken = (token: string) => Session.set(TokenKey, token);

export const removeToken = () => Session.remove(TokenKey);



