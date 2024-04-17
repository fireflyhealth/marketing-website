import { Meta, StoryObj } from '@storybook/react';
import { practitionersBlockExample } from '@/mockData';
import { PractitionersBlock } from './';

const meta = {
  title: 'Content Blocks/Practitioners Block',
  component: PractitionersBlock,
} satisfies Meta<typeof PractitionersBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    practitionersBlock: practitionersBlockExample,
  },
  decorators: [
    (Story) => (
      <div className="theme-bg-color">
        <Story />
      </div>
    ),
  ],
};

export default meta;
