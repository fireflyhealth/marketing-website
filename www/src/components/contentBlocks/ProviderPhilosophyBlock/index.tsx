import { FC } from 'react';
import cn from 'classnames';
import { ProviderPhilosophyBlock as ProviderPhilosophyBlockType } from '@/types/sanity';
import { Theme } from '@/components/Theme';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { Wrapper, Quote } from './styles';

type Props = {
  providerPhilosophyBlock: ProviderPhilosophyBlockType;
};

export const ProviderPhilosophyBlock: FC<Props> = ({
  providerPhilosophyBlock,
}) => {
  const { header, subnav, theme, icon, quote } = providerPhilosophyBlock;
  return (
    <ContentBlockWrapper header={header} id={subnav?.contentBlockId}>
      <Theme theme={theme}>
        <div className={cn(Wrapper)}>
          {icon && (
            <BrandedIcon
              type={`${icon.icon}`}
              wrapperStyles="w-12 h-12 mx-auto mb-6 lg:w-[100px] lg:h-[100px]"
            />
          )}
          <div className={cn(Quote)}>{quote}</div>
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
