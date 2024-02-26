import { FC } from 'react';
import cn from 'classnames';
import { DoubleCTA } from '@/components/DoubleCTA';
import * as SanityTypes from '@/types/sanity';
import {
  ContentBlockHeader,
  ContentBlockWrapper,
} from '../ContentBlockWrapper';
import { Wrapper } from './styles';

type Props = {
  doubleCtaBlock: SanityTypes.DoubleCtaBlock;
};

export const DoubleCtaBlock: FC<Props> = ({ doubleCtaBlock }) => {
  const { subnav, header, doubleCta } = doubleCtaBlock;

  return (
    <ContentBlockWrapper
      id={subnav?.contentBlockId}
      header={header}
      wrapperPadding={false}
    >
      <div className={cn(Wrapper)}>
        <DoubleCTA doubleCta={doubleCta} />
      </div>
    </ContentBlockWrapper>
  );
};
