export function guardarToken(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiry = payload.exp * 1000; // a ms
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpiry', expiry);
}

export function getToken() {
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('tokenExpiry');
  if (!token || !expiry) {
    return null;
  }

  if (Date.now() > Number(expiry)) {
    removeToken();
    return null;
  }

  return token;
}

export function removeToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiry');
}