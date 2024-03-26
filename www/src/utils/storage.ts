import Cookie from 'js-cookie';
import { config } from '@/config';

type ABVersion = 'A' | 'B';

/**
 * Cookies
 *
 * Note: Use cookies when the stored value should expire or needs to
 * be read at request time. Otherwise, prefer localStorage.
 */

class CookieManager<T> {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  set(value: T, options?: Cookies.CookieAttributes): void {
    Cookie.set(this.key, JSON.stringify(value), options);
  }

  get(): T | undefined {
    const value = Cookie.get(this.key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return undefined;
  }

  clear(): void {
    Cookie.remove(this.key);
  }
}

/**
 * Cookie Names & Managers
 */
const AB_COOKIE_NAME = config.googleTagManager.ab.cookieName;
export const ABCookieManager = new CookieManager<ABVersion>(AB_COOKIE_NAME);
