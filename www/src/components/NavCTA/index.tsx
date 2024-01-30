import { FC } from 'react';
import cn from 'classnames';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import {
  Wrapper,
  BackgroundColor,
  CTA_Container,
  CTA_Card,
  Card_Label,
  CTA,
  Label,
} from './styles';

export const NavCTA: FC = () => {
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BackgroundColor)} />
      <div className={cn(CTA_Container)}>
        <div className={cn(CTA_Card)}>
          <div className={cn(Card_Label)}>For Individuals</div>
          <div className={cn(CTA)}>
            <div className={cn(Label)}>Sign up</div>
            <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
          </div>
        </div>
        <div className={cn(CTA_Card)}>
          <div className={cn(Card_Label)}>For Businesses</div>
          <div className={cn(CTA)}>
            <div className={cn(Label)}>Get in touch</div>
            <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
