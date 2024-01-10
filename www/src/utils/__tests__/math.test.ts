import { sum } from '../math';

describe('sum', () => {
  it('should add two numbers', async () => {
    expect(sum(1, 2)).toBe(3);
  });
});
