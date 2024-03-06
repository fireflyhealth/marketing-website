import React, { FC, useState, useEffect, useContext, useRef } from 'react';
import cn from 'classnames';
import debounce from 'lodash/debounce';
import { useSwipeable } from 'react-swipeable';
import { BrandedIcon } from '@/svgs/BrandedIcon';

type WithChildren<T = {}> = T & {
  children: React.ReactNode;
};

/**
 * Context
 */

type ContextValue = {
  slideCount: number;
  currentSlideIndex: number;
  setCurrentSlideIndex: (slide: number) => void;
  goPrev: () => void;
  goNext: () => void;
  slideContainerLeft: number;
  setSlideContainerLeft: (newLeft: number) => void;
};

const CarouselContext = React.createContext<ContextValue | null>(null);

export const useCarousel = () => {
  const ctx = useContext(CarouselContext);
  if (ctx === null) {
    throw new Error('useCarousel must be within a CarouselProvider');
  }
  return ctx;
};

/**
 * Main component
 */
type CarouselProps = WithChildren & {
  vwHeightSetting?: number;
  /** isImageCarousel handles styles for image carousels */
  isImageCarousel?: boolean;
};

export const Carousel: FC<CarouselProps> = ({
  children,
  vwHeightSetting,
  isImageCarousel,
}) => {
  const slideCount = React.Children.count(children);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideContainerLeft, setSlideContainerLeft] = useState(0);

  const goPrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      // Un-comment to re-enable looping
      // setCurrentSlideIndex(slideCount - 1);
    }
  };

  const goNext = () => {
    if (currentSlideIndex === slideCount - 1) {
      // Un-comment to re-enable looping
      // setCurrentSlideIndex(0);
    } else {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <CarouselContext.Provider
      value={{
        slideCount,
        slideContainerLeft,
        setSlideContainerLeft,
        currentSlideIndex,
        setCurrentSlideIndex,
        goPrev,
        goNext,
      }}
    >
      <SlideContainer
        vwHeightSetting={vwHeightSetting}
        isImageCarousel={isImageCarousel}
      >
        {React.Children.map(children, (child, index) => (
          <Slide slideIndex={index} isImageCarousel={isImageCarousel}>
            {child}
          </Slide>
        ))}
      </SlideContainer>
      {/* Prev/Next component */}
      <div
        className={cn('pt-12', !isImageCarousel ? 'hidden md:block' : 'block')}
      >
        <PrevButton>
          <BrandedIcon type="arrow-left" wrapperStyles="w-12" />
        </PrevButton>
        <NextButton>
          <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
        </NextButton>
      </div>
      {/* Pagination (dots) component */}
      <div
        className={cn(
          'pt-8 pb-4',
          !isImageCarousel ? 'block md:hidden' : 'hidden',
        )}
      >
        <Pagination />
      </div>
    </CarouselContext.Provider>
  );
};

/**
 * Child components
 */

type SlideProps = WithChildren & {
  slideIndex: number;
  isImageCarousel?: boolean;
};

const goToSelfIfActive = (
  currentSlideIndex: number,
  slideIndex: number,
  setSlideContainerLeft: (newLeft: number) => void,
  slideElement: HTMLDivElement,
) => {
  if (currentSlideIndex === slideIndex) {
    const parent = slideElement.offsetParent;

    if (!parent || !(parent instanceof HTMLElement)) return;
    // get its left position within its parent (offset)
    const slideElementLeft = slideElement.offsetLeft + parent.offsetLeft;

    /* TODO: ensure slides always fill the container (do not
     * scroll too far for the final slides) */
    setSlideContainerLeft(-slideElementLeft);
  }
};

export const Slide: FC<SlideProps> = ({
  children,
  slideIndex,
  isImageCarousel = false,
}) => {
  const { setSlideContainerLeft, currentSlideIndex } = useCarousel();
  const [windowSize, setWindowSize] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1000,
  );
  const slideElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slideElement.current) return;
    goToSelfIfActive(
      currentSlideIndex,
      slideIndex,
      setSlideContainerLeft,
      slideElement.current,
    );
  }, [currentSlideIndex, slideIndex, setSlideContainerLeft, windowSize]);

  // Update the container left whenever the window resizes.
  // this prevents bugginess/inconsistencies between pagination and next/prev components.
  useEffect(() => {
    const updateWindowSize = debounce(() => setWindowSize(window.innerWidth));
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return (
    <div
      ref={slideElement}
      className={cn(
        'carousel__slide h-full relative',
        // TODO: refactor how non image carousel slides
        // are positioned.
        !isImageCarousel && 'odd:mt-0 even:mt-8 md:even:mt-12',
        !isImageCarousel && currentSlideIndex != slideIndex
          ? 'hidden md:block'
          : '',
      )}
    >
      {children}
    </div>
  );
};

export const SlideContainer: FC<CarouselProps> = ({
  children,
  vwHeightSetting,
  isImageCarousel = false,
}) => {
  const { slideContainerLeft, goNext, goPrev } = useCarousel();
  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      className={cn(
        'relative w-full',
        isImageCarousel ? 'h-[240px] md:h-[750px]' : '',
      )}
      style={{
        height: vwHeightSetting ? `${vwHeightSetting}vw` : undefined,
      }}
    >
      {/* Slide container inner div */}
      <div
        className={cn(
          'transition h-full flex flex-row',
          isImageCarousel ? 'absolute top-0 left-0' : '',
        )}
        style={{ transform: `translateX(${slideContainerLeft}px)` }}
        {...handlers}
      >
        {children}
      </div>
    </div>
  );
};

export const Pagination: FC = () => {
  const { slideCount, currentSlideIndex, setCurrentSlideIndex } = useCarousel();

  return (
    <div className="flex flex-row space-x-1 justify-center">
      {Array.from(Array(slideCount)).map((slide, index) => (
        <button
          key={slide}
          className={cn(
            'w-[11px] h-[11px] rounded-full',
            currentSlideIndex === index ? 'bg-black' : 'bg-grey-medium',
          )}
          onClick={() => setCurrentSlideIndex(index)}
        />
      ))}
    </div>
  );
};

export const PrevButton: FC<WithChildren> = ({ children }) => {
  const { currentSlideIndex, goPrev } = useCarousel();

  return (
    <button disabled={currentSlideIndex === 0} onClick={goPrev}>
      {children}
    </button>
  );
};

export const NextButton: FC<WithChildren> = ({ children }) => {
  const { currentSlideIndex, slideCount, goNext } = useCarousel();

  return (
    <button
      className="ml-5"
      disabled={currentSlideIndex === slideCount - 1}
      onClick={goNext}
    >
      {children}
    </button>
  );
};
