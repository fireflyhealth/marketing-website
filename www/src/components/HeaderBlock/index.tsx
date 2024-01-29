import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Wrapper, Heading, Title, Description } from './styles';

// TODO: add CTA after component is created

export const HeaderBlock: FC<SanityTypes.HeaderBlock> = ({
  title,
  description,
  cta,
}) => {
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(Heading)}>
        <h2 className={cn(Title)}>{title}</h2>
        <h6 className={cn(Description)}>{description}</h6>
      </div>
    </div>
  );
};
