import React, { FC, useState, useEffect, useContext, useRef } from 'react';
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
type CarouselProps = WithChildren;

export const Carousel: FC<CarouselProps> = ({ children }) => {
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
        goPrev,
        goNext,
      }}
    >
      <SlideContainer>
        {React.Children.map(children, (child, index) => (
          <Slide slideIndex={index}>{child}</Slide>
        ))}
      </SlideContainer>
      <div className="pt-12">
        <PrevButton>
          <BrandedIcon type="arrow-left" wrapperStyles="w-12" />
        </PrevButton>
        <NextButton>
          <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
        </NextButton>
      </div>
    </CarouselContext.Provider>
  );
};

/**
 * Child components
 */

type SlideProps = WithChildren & {
  slideIndex: number;
};

export const Slide: FC<SlideProps> = ({ children, slideIndex }) => {
  const { setSlideContainerLeft, currentSlideIndex } = useCarousel();
  const slideElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slideElement.current) return;
    // when this slide is the current one

    if (currentSlideIndex === slideIndex) {
      const parent = slideElement.current.offsetParent;

      if (!parent || !(parent instanceof HTMLElement)) return;
      // get its left position within its parent (offset)
      const slideElementLeft =
        slideElement.current.offsetLeft + parent.offsetLeft;

      /* TODO: ensure slides always fill the container (do not
       * scroll too far for the final slides) */
      setSlideContainerLeft(-slideElementLeft);
    }
  }, [currentSlideIndex, slideIndex, setSlideContainerLeft]);

  return (
    <div className="carousel__slide h-full relative" ref={slideElement}>
      {children}
    </div>
  );
};

export const SlideContainer: FC<WithChildren> = ({ children }) => {
  const { slideContainerLeft, goNext, goPrev } = useCarousel();
  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="relative w-full h-[400px]">
      {/* Slide container inner div */}
      <div
        className="absolute top-0 left-0 transition h-full flex flex-row"
        style={{ transform: `translateX(${slideContainerLeft}px)` }}
        {...handlers}
      >
        {children}
      </div>
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
