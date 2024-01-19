import React, { FC, useState, useEffect, useContext, useRef } from 'react';

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
type CarouselProps = WithChildren<{
  slideCount: number;
}>;

export const Carousel: FC<CarouselProps> = ({ children, slideCount }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideContainerLeft, setSlideContainerLeft] = useState(0);

  const goPrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setCurrentSlideIndex(slideCount - 1);
    }
  };

  const goNext = () => {
    if (currentSlideIndex === slideCount - 1) {
      setCurrentSlideIndex(0);
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
      <div>{children}</div>
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
      {currentSlideIndex === slideIndex && (
        <div className="absolute top-0">Current Slide</div>
      )}
    </div>
  );
};

export const SlideContainer: FC<WithChildren> = ({ children }) => {
  const { slideContainerLeft, currentSlideIndex } = useCarousel();
  /* TODO: make swipe-able / draggable */

  return (
    <div className="relative w-full h-[400px]">
      {/* Slide container inner div */}
      <div
        className="absolute top-0 left-0 transition h-full flex flex-row"
        style={{ transform: `translateX(${slideContainerLeft}px)` }}
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
    <button disabled={currentSlideIndex === slideCount - 1} onClick={goNext}>
      {children}
    </button>
  );
};
