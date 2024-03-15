import { Meta, StoryObj } from '@storybook/react';
import { testimonialBlockExample } from '@/mockData';
import { TestimonialBlock } from './';

const meta = {
  title: 'Content Blocks/Testimonial Block',
  component: TestimonialBlock,
} satisfies Meta<typeof TestimonialBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    testimonialBlock: testimonialBlockExample,
  },
  decorators: [
    (Story) => (
      <div className="-m-[25px] theme-bg-color">
        <Story />
      </div>
    ),
  ],
};

export default meta;
