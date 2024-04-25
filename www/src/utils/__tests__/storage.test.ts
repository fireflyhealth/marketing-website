import { CookieManager } from '../storage';

const TestCookieManager = new CookieManager<string>('test');

describe('cookie manager', () => {
  it('should set and get correct cookie', async () => {
    TestCookieManager.set('test-value');
    const cookieValue = TestCookieManager.get();

    expect(cookieValue).toBe('test-value');
  });

  it('should clear cookie', async () => {
    TestCookieManager.set('test-value');
    const cookieValue = TestCookieManager.get();
    expect(cookieValue).toBe('test-value');

    TestCookieManager.clear();
    const clearedCookieValue = TestCookieManager.get();

    expect(clearedCookieValue).toBe(undefined);
  });
});
