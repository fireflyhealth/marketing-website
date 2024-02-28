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
    <div className={cn(Wrapper)}>
      <div className={cn(WrapperInner)}>
        <ContentBlockWrapper
          id={subnav?.contentBlockId}
          header={header}
          wrapperPadding={false}
          enableMaxWidth={false}
        >
          <DoubleCTA doubleCta={doubleCta} />
        </ContentBlockWrapper>
      </div>
    </div>
  );
};
