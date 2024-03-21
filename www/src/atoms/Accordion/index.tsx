import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { TitleWrapper } from './styles';

type AccordionProps = {
  title: string;
  children: ReactNode;
  active?: boolean;
};

export const Accordion: FC<AccordionProps> = ({ title, children, active }) => {
  const accordionRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((value) => !value);

  useEffect(() => {
    if (active) {
      setIsOpen(true);
      if (accordionRef.current) {
        accordionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [active, accordionRef.current]);

  return (
    <div ref={accordionRef}>
      <button
        aria-expanded={isOpen}
        onClick={toggleOpen}
        className={cn(TitleWrapper, 'element-focus py-4 -mt-4 -mb-4')}
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
        <div className="pt-3 pr-7">{children}</div>
      </div>
    </div>
  );
};
