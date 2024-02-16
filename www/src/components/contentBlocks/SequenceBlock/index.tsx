import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import { useUIProvider } from '@/context/UIProvider';
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
import { SequenceLines } from './SequenceLines';

type Props = {
  sequenceBlock: SanityTypes.SequenceBlock;
};

export const SequenceBlock: FC<Props> = ({ sequenceBlock }) => {
  const { header, sequenceHeader, sequenceItems, sequenceFooter } =
    sequenceBlock;

  const { sequenceLinePosition } = useUIProvider();
  const [sequenceAnchorWidth, setSequenceAnchorWidth] = useState(0);

  useEffect(() => {
    const windowWidth = window.screen.width / 2;
    const width = sequenceLinePosition - windowWidth;
    setSequenceAnchorWidth(width * -1);
  }, [sequenceLinePosition, sequenceAnchorWidth]);
  return (
    <>
      <ContentBlockWrapper header={header}>
        <div className={cn(Wrapper)}>
          <div className={cn(Header)}>
            <SequenceCopy copy={sequenceHeader} headerCopy />
            <div className="relative pt-12">
              <SequenceLines />

              <div
                className={cn(Sequence_Pathway_1, 'hidden')}
                style={{ width: `${sequenceAnchorWidth}px` }}
              >
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

              <div className={cn(SequenceItems)}>
                {sequenceItems.map((item) => (
                  <SequenceCard key={item._key} card={item} />
                ))}
                <div
                  className={cn(Sequence_Pathway_2)}
                  style={{ left: `${sequenceLinePosition}px` }}
                />
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
          </div>
        </div>
      </ContentBlockWrapper>
    </>
  );
};
