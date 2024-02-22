import React, { FC } from 'react';
import { RichTextCtaRow as RichTextCtaRowType } from '@/types/sanity';
import { CTA } from '../CTA';

type RichTextCtaRowProps = {
  richTextCtaRow: RichTextCtaRowType;
};

export const RichTextCtaRow: FC<RichTextCtaRowProps> = ({ richTextCtaRow }) => {
  const { ctas } = richTextCtaRow;
  return (
    <div className="flex flex-row flex-wrap mb-[-1rem]">
      {ctas.map((cta) => (
        <div key={cta._key} className="mr-4 mb-4">
          <CTA width="auto" cta={cta} />
        </div>
      ))}
    </div>
  );
};
