import React, { ComponentProps } from 'react';
import { userEvent } from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { isAriaHidden, isAriaSelected } from 'testing/utils';
import { Tabs } from '../';

const TabsExample = (
  overrideProps: Partial<ComponentProps<typeof Tabs>> = {},
) => (
  <Tabs
    tabs={[
      {
        _key: 'tabOne',
        label: 'Tab One Label',
        children: <div>Tab One Content</div>,
      },
      {
        _key: 'tabTwo',
        label: 'Tab Two Label',
        children: <div>Tab Two Content</div>,
      },
      {
        _key: 'tabThree',
        label: 'Tab Three Label',
        children: <div>Tab Three Content</div>,
      },
    ]}
    {...overrideProps}
  />
);

describe('Tabs', () => {
  it('should show only active tab content', async () => {
    const user = userEvent.setup();
    const { getByText } = render(<TabsExample />);
    expect(isAriaHidden(getByText('Tab One Content'))).toBe(false);
    expect(isAriaHidden(getByText('Tab Two Content'))).toBe(true);
    expect(isAriaHidden(getByText('Tab Three Content'))).toBe(true);

    const tabTwoBtn = getByText('Tab Two Label');

    await user.click(tabTwoBtn);

    expect(isAriaHidden(getByText('Tab One Content'))).toBe(true);
    expect(isAriaHidden(getByText('Tab Two Content'))).toBe(false);
    expect(isAriaHidden(getByText('Tab Three Content'))).toBe(true);
  });

  it('should apply appropriate aria-selected attributes', async () => {
    const user = userEvent.setup();
    const { getByText } = render(<TabsExample />);
    expect(isAriaSelected(getByText('Tab One Label'))).toBe(true);
    expect(isAriaSelected(getByText('Tab Two Label'))).toBe(false);
    expect(isAriaSelected(getByText('Tab Three Label'))).toBe(false);

    const tabTwoBtn = getByText('Tab Two Label');

    await user.click(tabTwoBtn);

    expect(isAriaSelected(getByText('Tab One Label'))).toBe(false);
    expect(isAriaSelected(getByText('Tab Two Label'))).toBe(true);
    expect(isAriaSelected(getByText('Tab Three Label'))).toBe(false);
  });

  it('should initialize with the content for "initialTabKey"', () => {
    const { getByText } = render(<TabsExample initialTabKey="tabTwo" />);

    expect(isAriaSelected(getByText('Tab Two Label'))).toBe(true);
    expect(isAriaHidden(getByText('Tab Two Content'))).toBe(false);
  });

  it('should console.warn and fall back on the first available key if initialTabKey is invalid', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { getByText } = render(<TabsExample initialTabKey="tabNinetyNine" />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Tab key "tabNinetyNine" is invalid. Available keys: tabOne, tabTwo, tabThree',
    );

    expect(isAriaSelected(getByText('Tab One Label'))).toBe(true);
    expect(isAriaHidden(getByText('Tab One Content'))).toBe(false);
    consoleErrorSpy.mockRestore();
  });
});
