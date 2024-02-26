import React, { FC, ReactNode, useState } from 'react';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { TitleWrapper } from './styles';

type AccordionProps = {
  title: string;
  children: ReactNode;
};

export const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((value) => !value);
  return (
    <div>
      <button
        aria-expanded={isOpen}
        onClick={toggleOpen}
        className={cn(TitleWrapper)}
      >
        <span className="pr-4">{title}</span>
        <div>
          <SimpleIcon
            type={isOpen ? 'arrow-up' : 'arrow-down'}
            iconStyles="theme-icon-overlap"
          />
        </div>
      </button>
      <div
        aria-hidden={!isOpen}
        className={isOpen ? 'block' : 'opacity-0 h-0 pointer-events-none'}
      >
        <div className="pt-3">{children}</div>
      </div>
    </div>
  );
};
