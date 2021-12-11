import decode from 'jwt-decode';

export function decodeToken(token) {
  return decode(token);
}

export function isAuthenticated(token) {
  const refreshToken = localStorage.getItem('token');

  try {
    decode(token);

    const { exp } = decode(refreshToken);

    if (Date.now() >= exp * 1000) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}
