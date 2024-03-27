import Cookie from 'js-cookie';
import { config } from '@/config';

/**
 * Cookies
 *
 * Note: Use cookies when the stored value should expire or needs to
 * be read at request time. Otherwise, prefer localStorage.
 */

class CookieManager<T> {
  key: string;
  isString: boolean;

  constructor(key: string, isString: boolean = true) {
    this.key = key;
    this.isString = isString;
  }

  set(value: T, options?: Cookies.CookieAttributes): void {
    const valueToSet =
      typeof value === 'string' ? value : JSON.stringify(value);
    Cookie.set(this.key, valueToSet, options);
  }

  get(): T | undefined {
    const value = Cookie.get(this.key);
    if (value) {
      return this.isString ? JSON.parse(value) : value;
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
export const ABCookieManager = new CookieManager<string>(AB_COOKIE_NAME);
