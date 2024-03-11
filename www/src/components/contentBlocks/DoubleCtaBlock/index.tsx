import { FC } from 'react';
import cn from 'classnames';
import { DoubleCTA } from '@/components/DoubleCTA';
import * as SanityTypes from '@/types/sanity';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { Wrapper, WrapperInner } from './styles';

type Props = {
  doubleCtaBlock: SanityTypes.DoubleCtaBlock;
};

export const DoubleCtaBlock: FC<Props> = ({ doubleCtaBlock }) => {
  const { subnav, header, doubleCta } = doubleCtaBlock;

  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <div className={cn(Wrapper)}>
        <div className="full-width-background bg-grey" />
        <div className={cn(WrapperInner)}>
          <DoubleCTA doubleCta={doubleCta} />
        </div>
      </div>
    </ContentBlockWrapper>
  );
};
