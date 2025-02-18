'use server';

import { cookies } from 'next/headers';

interface CookieOptions {
  path?: string;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

interface SetCookieParams {
  cookieName: string;
  value: string;
  options?: CookieOptions;
}

export async function getCookie({cookieName}:{cookieName:string}) {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName);
}

export async function setCookie({ cookieName, value, options }: SetCookieParams) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, value, options);
}

export async function deleteCookie({ cookieName }: {cookieName:string}) {
  (await cookies()).delete(cookieName)
}