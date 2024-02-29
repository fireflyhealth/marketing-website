import React, { FC } from 'react';
import cn from 'classnames';
import { Footer as FooterType } from '@/types/sanity';
import { filterMaybes } from '@/utils/arrays';
import { Link } from '@/atoms/Link';
import { CTA } from '@/components/CTA';
import { LogotypeColor } from '@/svgs/Logotype';
import { Theme, ColorTheme } from '../Theme';
import {
  FooterBottomLinks,
  FooterBottomNavGroup,
  FooterCta,
  FooterLogotype,
  FooterMain,
  FooterNavGroup,
  FooterNavGroups,
  FooterOuter,
  FooterInner,
  FooterQRCode,
} from './styles';

type FooterProps = {
  footer: FooterType;
};

export const Footer: FC<FooterProps> = ({ footer }) => {
  const { mobileCta, footerNavGroups, bottomLinks } = footer;
  return (
    <Theme theme={ColorTheme.Grey}>
      <footer className={cn(FooterOuter)}>
        <div className={cn(FooterInner)}>
          <div className={cn(FooterCta)}>
            <CTA cta={mobileCta} />
          </div>
          <div className={cn(FooterMain)}>
            <div className="flex-grow">
              <div className={cn(FooterLogotype)}>
                <LogotypeColor />
              </div>
              <div className={cn(FooterNavGroups)}>
                {filterMaybes(footerNavGroups).map((footerGroup) => (
                  <div className={cn(FooterNavGroup)} key={footerGroup._key}>
                    {filterMaybes(footerGroup.navItems).map((navItem) => (
                      <div key={navItem._key} className="font-size-8">
                        <Link link={navItem.link}>{navItem.label}</Link>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className={cn(FooterQRCode)}>
              <span>QR Code placeholder</span>
            </div>
          </div>
          <div className={cn(FooterBottomLinks)}>
            <div className={cn(FooterBottomNavGroup)}>
              {filterMaybes(bottomLinks?.leftLinks).map((navItem) => (
                <div key={navItem._key} className="font-size-10 md:mr-8">
                  <Link link={navItem.link}>{navItem.label}</Link>
                </div>
              ))}
            </div>
            <div className={cn(FooterBottomNavGroup)}>
              {filterMaybes(bottomLinks?.rightLinks).map((navItem) => (
                <div key={navItem._key} className="font-size-10 md:ml-8">
                  <Link link={navItem.link}>{navItem.label}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </Theme>
  );
};
