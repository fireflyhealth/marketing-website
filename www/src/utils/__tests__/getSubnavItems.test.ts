import { getSubnavItems } from '../getSubnavItems';
import {
  getSubnavItemsSubnavItemsMockData,
  getSubnavItemsWithoutSubnavItemsMockData,
} from './mockData';

describe('get subnav items', () => {
  it('should return correct subnavs', async () => {
    expect(getSubnavItems(getSubnavItemsSubnavItemsMockData)).toEqual([
      {
        contentBlockId: 'subnav1',
        label: 'subnav1',
        ariaLabel: 'subnav1',
      },
      {
        contentBlockId: 'subnav2',
        label: 'subnav2',
        ariaLabel: 'subnav2',
      },
      {
        contentBlockId: 'subnav3',
        label: 'subnav3',
        ariaLabel: 'subnav3',
      },
    ]);
  });

  it('should return null when content is not available', async () => {
    expect(getSubnavItems(undefined)).toEqual(null);
  });

  it('should return empty array when content does not have subnav', async () => {
    expect(getSubnavItems(getSubnavItemsWithoutSubnavItemsMockData)).toEqual(
      [],
    );
  });
});
