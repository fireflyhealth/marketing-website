import { render } from '@testing-library/react';
import { articleRichText } from '@/mockData';
import { BigNumbers } from '@/types/sanity';
import { matchTextContent } from 'testing/utils';
import { BigNumber } from '../index';

const bigNumbersBlock = articleRichText.find(
  (b) => b._type === 'bigNumbers',
) as BigNumbers;

const noneType = bigNumbersBlock.bigNumbers.find((b) => !b.unit);
const dollarType = bigNumbersBlock.bigNumbers.find(
  (b) => b.unit?.unitValue === '$',
);
const percentageType = bigNumbersBlock.bigNumbers.find(
  (b) => b.unit?.unitValue === '%',
);

if (!noneType) {
  throw new Error('Could not get bigNumber block of numberType "none"');
}
if (!dollarType) {
  throw new Error('Could not get bigNumber block of numberType "dollar"');
}
if (!percentageType) {
  throw new Error('Could not get bigNumber block of numberType "percentage"');
}

describe('BigNumber', () => {
  it('should display a formatted number with no symbol', async () => {
    const { getByText } = render(<BigNumber bigNumber={noneType} />);
    expect(getByText('20,000')).toBeTruthy();
  });

  it('should display a formatted dollar amount', async () => {
    const { getByText } = render(<BigNumber bigNumber={dollarType} />);
    expect(getByText(matchTextContent('$2,500'))).toBeTruthy();
  });

  it('should display a formatted percentage amount', async () => {
    const { getByText } = render(<BigNumber bigNumber={percentageType} />);
    expect(getByText(matchTextContent('65%'))).toBeTruthy();
  });
});
