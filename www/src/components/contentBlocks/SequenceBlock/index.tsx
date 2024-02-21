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
  FooterIconWrapper,
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
            <div className={cn(FooterIconWrapper)}>
              <BrandedIcon
                type="navigation-compass"
                wrapperStyles="w-12 md:w-[100px] z-20 my-auto"
              />
            </div>
          </div>

          <div className={cn(FooterWrapper)}>
            <p className={cn(FooterText)}>{sequenceFooter}</p>
          </div>
        </div>
      </div>
    </>
  );
};
