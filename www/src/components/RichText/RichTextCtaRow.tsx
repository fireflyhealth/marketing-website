import React, { FC } from 'react';
import { RichTextCtaRow as RichTextCtaRowType } from '@/types/sanity';
import { CTA } from '../CTA';

type RichTextCtaRowProps = {
  richTextCtaRow: RichTextCtaRowType;
};

export const RichTextCtaRow: FC<RichTextCtaRowProps> = ({ richTextCtaRow }) => {
  const { ctas } = richTextCtaRow;
  return (
    <div className="flex flex-row space-x-4">
      {ctas.map((cta) => (
        <CTA key={cta._key} width="auto" cta={cta} />
      ))}
    </div>
  );
};
