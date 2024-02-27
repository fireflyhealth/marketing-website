import { formatSanityDate, toQuotation } from '../text';

describe('toQuotation', () => {
  it('should add curly quotes to strings without quote marks', async () => {
    expect(
      toQuotation(
        "Christopher Robin! Will you kindly shake your umbrella and say 'tut tut it looks like rain!'?",
      ),
    ).toBe(
      "“Christopher Robin! Will you kindly shake your umbrella and say 'tut tut it looks like rain!'?”",
    );
  });

  it('should replace single quote marks with curly quotes', async () => {
    expect(toQuotation("'Any day spent with you is my favorite day.'")).toBe(
      '“Any day spent with you is my favorite day.”',
    );
  });

  it('should replace double straight quote marks with curly quotes', async () => {
    expect(toQuotation('"Oh, bother."')).toBe('“Oh, bother.”');
  });

  it('should preserve curly quotes', async () => {
    expect(toQuotation('“Could you spare a small smackerel?”')).toBe(
      '“Could you spare a small smackerel?”',
    );
  });
});

describe('formatSanityDate', () => {
  it('should format a sanity date string', async () => {
    expect(formatSanityDate('1986-07-12')).toBe('July 12, 1986');
  });

  it('should format a date string that has time & timezone information', () => {
    expect(formatSanityDate('2024-02-23T19:13:25Z')).toBe('February 23, 2024');
  });
});
