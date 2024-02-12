import { userEvent } from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { practitionersBlockExample } from '@/mockData';
import { PractitionersBlock } from '../index';

describe('PractitionersBlock', () => {
  it('should display a "show more" button when there are more than 12 practitioners', async () => {
    const user = userEvent.setup();
    const { container, getAllByText, getByTestId } = render(
      <PractitionersBlock practitionersBlock={practitionersBlockExample} />,
    );

    /* Test using the desktop button, which should be visible & clickable to
     * jest-dom */
    const desktopButton = getAllByText('Show more')[0];
    const desktopButtonWrapper = getByTestId('showMoreButton--desktop');
    const mobileButtonWrapper = getByTestId('showMoreButton--mobile');
    const cards = container.querySelectorAll('.PractitionerCardWrapper');

    cards.forEach((card, index) => {
      const classList = Array.from(card.classList);
      if (index < 8) {
        /* Initial 8 should always be visible */
        expect(classList).not.toContain('hidden');
      } else if (index < 12) {
        /* 8-12 should be visible only above md */
        expect(classList).toContain('hidden');
        expect(classList).toContain('md:block');
      } else {
        /* everything beyond 12 should be hidden */
        expect(classList).toContain('hidden');
      }
    });

    await user.click(desktopButton);

    expect(Array.from(desktopButtonWrapper.classList)).toContain('hidden');
    expect(Array.from(mobileButtonWrapper.classList)).toContain('hidden');

    /* all cards should now be visible */
    cards.forEach((card) => {
      const classList = Array.from(card.classList);
      expect(classList).not.toContain('hidden');
    });
  });

  it('[desktop] should not display a "show more" button when there are fewer than 13 practitioners', () => {
    const withTwelvePractitioners = {
      ...practitionersBlockExample,
      practitioners: practitionersBlockExample.practitioners.slice(0, 11),
    };
    const { getByTestId } = render(
      <PractitionersBlock practitionersBlock={withTwelvePractitioners} />,
    );

    const desktopButtonWrapper = getByTestId('showMoreButton--desktop');
    const mobileButtonWrapper = getByTestId('showMoreButton--mobile');

    expect(Array.from(desktopButtonWrapper.classList)).toContain('hidden');
    expect(Array.from(mobileButtonWrapper.classList)).toContain('md:hidden');
  });

  it('[mobile] should not display a "show more" button when there are fewer than 9 practitioners', () => {
    const withEightPractitioners = {
      ...practitionersBlockExample,
      practitioners: practitionersBlockExample.practitioners.slice(0, 7),
    };
    const { getByTestId } = render(
      <PractitionersBlock practitionersBlock={withEightPractitioners} />,
    );

    const desktopButtonWrapper = getByTestId('showMoreButton--desktop');
    const mobileButtonWrapper = getByTestId('showMoreButton--mobile');

    expect(Array.from(desktopButtonWrapper.classList)).toContain('hidden');
    expect(Array.from(mobileButtonWrapper.classList)).toContain('hidden');
  });
});
