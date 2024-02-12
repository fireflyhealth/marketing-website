import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ctaExamples } from '../../mockData';
import { CTA } from './';

const getCtaExample = (label: string) => {
  const ctaExample = ctaExamples.find((cta) => cta.label === label);
  if (!ctaExample) {
    throw new Error(`Could not get CTA example with label "${label}"`);
  }
  return ctaExample;
};

const CTAExamples = () => (
  <div className="p-3 rounded theme-bg-color">
    <div className="mb-4 font-size-8 theme-text-color-secondary pr-4 flex-shrink-0 tracking-tight">
      A LinkButton component rendered from the CTA object schema in sanity
    </div>

    <div className="mb-3">
      <div className="font-size-9 font-mono theme-text-color-secondary tracking-tight">
        Primary
      </div>

      <CTA cta={getCtaExample('Learn More')} />
    </div>

    <div className="mb-3">
      <div className="font-size-9 font-mono theme-text-color-secondary tracking-tight">
        Secondary
      </div>

      <CTA cta={getCtaExample('Get the Goods')} />
    </div>

    <div>
      <div className="font-size-9 font-mono theme-text-color-secondary tracking-tight">
        Outlined
      </div>

      <CTA cta={getCtaExample('Download')} />
    </div>
  </div>
);

const meta = {
  title: 'Components/CTA',
  component: CTAExamples,
} satisfies Meta<typeof CTAExamples>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export default meta;
