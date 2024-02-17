import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { ContentBlockHeader } from '../ContentBlockWrapper';
import { SequenceCard } from './SequenceCard';
import { SequenceCopy } from './SequenceCopy';
import {
  Wrapper,
  Container,
  Header,
  SequenceItems,
  FooterWrapper,
  FooterText,
} from './styles';
import { SequenceLines } from './SequenceLines';

type Props = {
  sequenceBlock: SanityTypes.SequenceBlock;
};

export const SequenceBlock: FC<Props> = ({ sequenceBlock }) => {
  const { header, sequenceHeader, sequenceItems, sequenceFooter } =
    sequenceBlock;

  return (
    <>
      {header && <ContentBlockHeader header={header} />}
      <div className={cn(Wrapper)}>
        <div className={cn(Container)}>
          <div className={cn(Header)}>
            <SequenceCopy copy={sequenceHeader} headerCopy />
          </div>
          <div className="relative pt-60 md:pt-[276px]">
            <SequenceLines />

            <div className={cn(SequenceItems)}>
              {sequenceItems.map((item) => (
                <SequenceCard key={item._key} card={item} />
              ))}
            </div>
            <div className={cn(FooterWrapper)}>
              <BrandedIcon
                type="navigation-compass"
                wrapperStyles="w-12 mb-8 z-20"
              />
              <p className={cn(FooterText)}>{sequenceFooter}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
