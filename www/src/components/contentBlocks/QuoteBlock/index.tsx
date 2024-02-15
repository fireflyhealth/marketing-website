import { FC } from 'react';
import { QuoteBlock as QuoteBlockType } from '@/types/sanity';
import { ContentBlockWrapper } from '@/components/contentBlocks/ContentBlockWrapper';
import { QuoteObject } from '@/components/Quote';
import { CTA } from '@/components/CTA';

type Props = {
  quoteBlock: QuoteBlockType;
};

export const QuoteBlock: FC<Props> = ({ quoteBlock }) => {
  const { header, quoteObject, cta } = quoteBlock;
  return (
    <ContentBlockWrapper header={header}>
      <QuoteObject quoteObject={quoteObject} />
      <CTA cta={cta} />
    </ContentBlockWrapper>
  );
};
