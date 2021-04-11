function isAuthenticated(token) {
  const refreshToken = localStorage.getItem('refreshToken');
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

export default isAuthenticated;
