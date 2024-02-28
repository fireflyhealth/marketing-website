import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { FAQTab as FAQTabType } from '@/types/sanity';
import { FAQTab } from '../FAQTab';

const sampleAnswer = [
  {
    _key: '1',
    _type: 'block',
    children: [
      {
        _key: '2',
        _type: 'span',
        marks: [],
        text: 'At Firefly, we believe that many heads are better than one. Instead of one doctor, we give you an entire care team: a trusted physician, nurse practitioner, health guide, and behavioral health specialist—all working together to help you feel your very best. Your Firefly team supports you over time, making sure you get the best care science has to offer for staying healthy and achieving your goals.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
];

const mockFaqTab: FAQTabType = {
  title: 'For Practitioners',
  faqGroups: [
    {
      _key: 'app',
      title: 'The app',
      questions: [
        {
          _type: 'faq',
          _id: 'faq-app-a',
          question: 'What is the first App question?',
          answer: sampleAnswer,
        },
        {
          _type: 'faq',
          _id: 'faq-app-b',
          question: 'What is the second App question?',
          answer: sampleAnswer,
        },
        {
          _type: 'faq',
          _id: 'faq-app-c',
          question: 'What is the third App question?',
          answer: sampleAnswer,
        },
      ],
    },
    {
      _key: 'account',
      title: 'Firefly account',
      questions: [
        {
          _type: 'faq',
          _id: 'faq-account-a',
          question: 'What is the first Account question?',
          answer: sampleAnswer,
        },
        {
          _type: 'faq',
          _id: 'faq-account-b',
          question: 'What is the second Account question?',
          answer: sampleAnswer,
        },
        {
          _type: 'faq',
          _id: 'faq-account-c',
          question: 'What is the third Account question?',
          answer: sampleAnswer,
        },
      ],
    },
  ],
};

describe('FAQTab', () => {
  it('should show all groups by default', async () => {
    const { getByText } = render(<FAQTab faqTab={mockFaqTab} />);
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
    const { getByText, queryByText, debug } = render(
      <FAQTab faqTab={mockFaqTab} />,
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
