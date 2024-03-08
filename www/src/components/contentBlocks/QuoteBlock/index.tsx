import { FC } from 'react';
import cn from 'classnames';
import { QuoteBlock as QuoteBlockType } from '@/types/sanity';
import { ContentBlockWrapper } from '@/components/contentBlocks/ContentBlockWrapper';
import { Theme, ColorTheme } from '@/components/Theme';
import { QuoteObject } from '@/components/Quote';
import { CTA } from '@/components/CTA';
import { Wrapper, CTAWrapper } from './styles';

type Props = {
  quoteBlock: QuoteBlockType;
};

export const QuoteBlock: FC<Props> = ({ quoteBlock }) => {
  const { header, quoteObject, cta, subnav } = quoteBlock;
  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <Theme theme={ColorTheme.White}>
        <div className={cn(Wrapper)}>
          <QuoteObject quoteObject={quoteObject} />
          {cta && (
            <div className={cn(CTAWrapper)}>
              <CTA cta={cta} />
            </div>
          )}
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
