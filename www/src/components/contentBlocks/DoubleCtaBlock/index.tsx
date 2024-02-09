import { FC } from 'react';
import cn from 'classnames';
import { DoubleCTA } from '@/components/DoubleCTA';
import * as SanityTypes from '@/types/sanity';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { Wrapper } from './styles';

type Props = {
  doubleCtaBlock: SanityTypes.DoubleCtaBlock;
};

export const DoubleCtaBlock: FC<Props> = ({ doubleCtaBlock }) => {
  return (
    <ContentBlockWrapper header={doubleCtaBlock.header}>
      <div className={cn(Wrapper)}>
        <DoubleCTA doubleCta={doubleCtaBlock.doubleCta} />
      </div>
    </ContentBlockWrapper>
  );
};
