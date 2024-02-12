import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { SequenceCard } from './SequenceCard';
import { SequenceCopy } from './SequenceCopy';
import {
  Wrapper,
  Header,
  SequenceItems,
  FooterWrapper,
  FooterText,
} from './styles';

type Props = {
  sequenceBlock: SanityTypes.SequenceBlock;
};

export const SequenceBlock: FC<Props> = ({ sequenceBlock }) => {
  const { sequenceHeader, sequenceItems, sequenceFooter } = sequenceBlock;
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(Header)}>
        <SequenceCopy copy={sequenceHeader} headerCopy />
      </div>
      <div className={cn(SequenceItems)}>
        {sequenceItems.map((item) => (
          <SequenceCard key={item._key} card={item} />
        ))}
      </div>
      <div className={cn(FooterWrapper)}>
        <BrandedIcon type="navigation-compass" wrapperStyles="w-12 mb-8" />
        <p className={cn(FooterText)}>{sequenceFooter}</p>
      </div>
    </div>
  );
};
