import { filterMaybes } from '../arrays';

type ObjectWithMaybes = {
  name: string;
  numbers?: number[];
};

describe('filterMaybes', () => {
  it('should filter null & undefined values', async () => {
    expect(filterMaybes([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);

    /* TS check */
    filterMaybes([1, null, 2, undefined, 3]) satisfies number[];
  });

  it('should return an empty array if given an undefined value', async () => {
    const example: ObjectWithMaybes = {
      name: 'Frank',
    };
    expect(filterMaybes(example.numbers)).toEqual([]);

    /* TS check */
    filterMaybes(example.numbers) satisfies number[];
  });
});
