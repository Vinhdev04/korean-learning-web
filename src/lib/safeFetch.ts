/* eslint-disable @typescript-eslint/no-explicit-any */
export async function safeFetch(endpoint: string, _tag: string): Promise<any | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  const isSSR = typeof window === 'undefined';
  const baseUrl = isSSR ? process.env.INTERNAL_API_BASE_URL : process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return null;
  }

  const fullUrl = `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  try {
    const res = await fetch(fullUrl, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const result = await res.json();
    return result?.data || null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`safeFetch warning [${endpoint}]:`, error);
    }
    return null;
  }
}
