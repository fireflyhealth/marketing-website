import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { SequenceCard } from './SequenceCard';
import { SequenceCopy } from './SequenceCopy';
import {
  Wrapper,
  Header,
  SequenceItems,
  FooterWrapper,
  FooterText,
  Sequence_Pathway_1,
  Sequence_Pathway_2,
  Sequence_Pathway_3,
} from './styles';

type Props = {
  sequenceBlock: SanityTypes.SequenceBlock;
};

export const SequenceBlock: FC<Props> = ({ sequenceBlock }) => {
  const { header, sequenceHeader, sequenceItems, sequenceFooter } =
    sequenceBlock;
  return (
    <ContentBlockWrapper header={header}>
      <div className={cn(Wrapper)}>
        <div className={cn(Header)}>
          <SequenceCopy copy={sequenceHeader} headerCopy />
          <div className={cn(Sequence_Pathway_1)}>
            <BrandedIcon
              type="straight-pathway"
              wrapperStyles="md:hidden"
              iconStyles="text-yellow-dark"
            />
            <BrandedIcon
              type="bent-pathway-small"
              wrapperStyles="hidden md:block lg:hidden"
              iconStyles="text-yellow-dark"
            />
            <BrandedIcon
              type="bent-pathway-large"
              wrapperStyles="hidden lg:block"
              iconStyles="text-yellow-dark"
            />
          </div>
        </div>
        <div className={cn(SequenceItems)}>
          {sequenceItems.map((item) => (
            <SequenceCard key={item._key} card={item} />
          ))}
          <div className={cn(Sequence_Pathway_2)} />
        </div>
        <div className={cn(FooterWrapper)}>
          <div className={cn(Sequence_Pathway_3)}>
            <BrandedIcon
              type="straight-pathway"
              wrapperStyles="md:hidden"
              iconStyles="text-yellow-dark"
            />
            <BrandedIcon
              type="bent-pathway-small"
              wrapperStyles="hidden md:block lg:hidden"
              iconStyles="text-yellow-dark"
            />
            <BrandedIcon
              type="bent-pathway-large"
              wrapperStyles="hidden lg:block"
              iconStyles="text-yellow-dark"
            />
          </div>
          <BrandedIcon
            type="navigation-compass"
            wrapperStyles="w-12 mb-8 z-20"
          />
          <p className={cn(FooterText)}>{sequenceFooter}</p>
        </div>
      </div>
    </ContentBlockWrapper>
  );
};
