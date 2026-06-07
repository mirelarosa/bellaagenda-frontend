import { env } from '../config/env';
import { getIdToken } from '../config/firebase';

export async function apiRequest(path, options = {}, forceRefresh = false) {
  const token = await getIdToken(forceRefresh);
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${env.apiUrl}${path}`, {
    ...options,
    headers
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && !forceRefresh) {
      return apiRequest(path, options, true);
    }
    const message = body.error?.message || res.statusText;
    const err = new Error(message);
    err.status = res.status;
    err.code = body.error?.code;
    throw err;
  }
  return body.data;
}
