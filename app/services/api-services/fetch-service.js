import { getSession, signOut } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const setAuthHeader = async () => {
  const session = await getSession();
  return session?.user?.token ? `Bearer ${session.user.token}` : null;
};

const fetchWithAuth = async (url, options = {}) => {
  const token = await setAuthHeader();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = token;
  }

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers,
  });

  if (response.ok) {
    return response.json();
  }

  // Handle different response statuses
  if (response.status === 503) {
    window.location.href = '/maintenance';
    throw new Error('Service Unavailable');
  }

  if (response.status === 401) {
    console.log('Unauthorized access - logging out or redirecting...');
    const session = await getSession();
    if (session) {
      await signOut({ callbackUrl: '/' });
    }
    throw new Error('Unauthorized');
  }

  // Handle other errors
  const error = await response.json();
  console.error('Fetch error:', error);
  throw new Error(error.message || 'Something went wrong');
};

// Example usage
const api = {
  get: (url) => fetchWithAuth(url, { method: 'GET' }),
  post: (url, body) => fetchWithAuth(url, { method: 'POST', body: JSON.stringify(body) }),
  // Add other methods as needed (PUT, DELETE, etc.)
};

export default api;
