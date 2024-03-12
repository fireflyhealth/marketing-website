import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import {
  FAQ,
  FAQSubject,
  FAQCategory as FAQCategoryType,
} from '@/types/sanity';
import 'jest';
import { FAQCategory, SortedFAQCategory } from '../FAQCategory';

const createMockQuestion = (question: string, answer: string): FAQ => ({
  _id: question,
  _type: 'faq',
  question,
  subject: {} as unknown as FAQSubject,
  category: {} as unknown as FAQCategoryType,
  answer: [
    {
      _key: '1',
      _type: 'block',
      children: [
        {
          _key: '2',
          _type: 'span',
          marks: [],
          text: answer,
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ],
});

const mockFaqCategory: SortedFAQCategory = {
  category: {
    _id: 'id-1',
    _type: 'faqCategory',
    title: 'For Providers',
    slug: { current: 'for-providers' },
  },
  subjects: [
    {
      subject: {
        _id: 'subject-id-1',
        _type: 'faqSubject',
        title: 'The app',
        slug: { current: 'the-app' },
      },
      questions: [
        createMockQuestion('Question One?', 'Answer One'),
        createMockQuestion('Question Two?', 'Answer Two'),
        createMockQuestion('Question Three?', 'Answer Three'),
      ],
    },
    {
      subject: {
        _id: 'subject-id-1',
        _type: 'faqSubject',
        title: 'Firefly account',
        slug: { current: 'firefly-account' },
      },
      questions: [
        createMockQuestion('Question Four?', 'Answer Four'),
        createMockQuestion('Question Five?', 'Answer Five'),
        createMockQuestion('Question Six?', 'Answer Six'),
      ],
    },
  ],
};

describe('FAQTab', () => {
  it('should show all groups by default', async () => {
    const { getByText } = render(<FAQCategory faqCategory={mockFaqCategory} />);
    const appHeadingLabel = getByText('The app', {
      selector: 'h3',
    });
    const accountHeadingLabel = getByText('Firefly account', {
      selector: 'h3',
    });
    expect(appHeadingLabel).toBeTruthy();
    expect(accountHeadingLabel).toBeTruthy();
  });

  it('should show only show a specific group after clicking a group button', async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(
      <FAQCategory faqCategory={mockFaqCategory} />,
    );
    const appHeadingButton = getByText('The app', { selector: '.cta__inner' });
    const allQuestionsButton = getByText('All questions', {
      selector: '.cta__inner',
    });

    await user.click(appHeadingButton);

    expect(
      queryByText('The app', {
        selector: 'h3',
      }),
    ).toBeTruthy();
    expect(
      queryByText('Firefly account', {
        selector: 'h3',
      }),
    ).not.toBeTruthy();

    // and then reset when clicking 'all'
    await user.click(allQuestionsButton);

    expect(
      queryByText('The app', {
        selector: 'h3',
      }),
    ).toBeTruthy();
    expect(
      queryByText('Firefly account', {
        selector: 'h3',
      }),
    ).toBeTruthy();
  });
});
