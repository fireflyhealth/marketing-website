import React, { FC } from 'react';
import { RichTextCtaRow as RichTextCtaRowType } from '@/types/sanity';
import { CTA } from '../CTA';

type RichTextCtaRowProps = {
  richTextCtaRow: RichTextCtaRowType;
};

export const RichTextCtaRow: FC<RichTextCtaRowProps> = ({ richTextCtaRow }) => {
  const { ctas } = richTextCtaRow;
  return (
    <div className="RichTextCtaRow flex flex-row flex-wrap mb-[-1rem]">
      {ctas.map((cta) => (
        <div key={cta._key} className="mb-4 mr-4">
          <CTA width="auto" cta={cta} />
        </div>
      ))}
    </div>
  );
};
