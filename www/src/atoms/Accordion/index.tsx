import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { TitleWrapper } from './styles';

type AccordionProps = {
  title: string;
  children: ReactNode;
  active?: boolean;
};

export const Accordion: FC<AccordionProps> = ({ title, children, active }) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const windowDimensions = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedContentHeight, setExpandedContentHeight] = useState<
    string | number
  >(
    /* Set the initial state to 'auto' if isOpen is true upon first render.
     * The effect below will set this to a number (which will match the natural height)
     * when it first runs. */
    isOpen ? 'auto' : 0,
  );

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

  useEffect(() => {
    /* Calculate and set the inner content height whenever the element
     * is expanded or when the window is resized. */
    const innerContentRefCurrent = innerContentRef.current;

    if (isOpen) {
      if (!innerContentRefCurrent) return;
      const innerContentHeight = innerContentRefCurrent.offsetHeight;
      setExpandedContentHeight(innerContentHeight);

      /* Set tabindex to 0 for all links in the expanded content to be focusable */
      innerContentRefCurrent.querySelectorAll('a').forEach((link) => {
        link.setAttribute('tabindex', '0');
      });
    } else {
      setExpandedContentHeight(0);

      if (!innerContentRefCurrent) return;
      /* Set tabindex to -1 for all links in the expanded content to not be focusable */
      innerContentRefCurrent.querySelectorAll('a').forEach((link) => {
        link.setAttribute('tabindex', '-1');
      });
    }
  }, [isOpen, windowDimensions]);

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
        style={{
          transition: 'height 0.3s ease',
          /* We cannot transition between height: 0 and height: auto,
           * so we need to set an explicit number height for the animation.
           * The effect above will calculate the height of the inner content
           * when the item is expanded, and then apply that number to this
           * wrapping div, animating from 0px to <some-number>px. */
          height: expandedContentHeight,
        }}
      >
        <div
          ref={innerContentRef}
          aria-hidden={!isOpen}
          className={cn(
            'transition-all block',
            isOpen ? '' : 'opacity-0 pointer-events-none',
          )}
        >
          <div className="pt-3 pr-7">{children}</div>
        </div>
      </div>
    </div>
  );
};
