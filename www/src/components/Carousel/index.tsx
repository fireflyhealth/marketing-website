import React, { FC, useState, useEffect, useContext, useRef } from 'react';
import cn from 'classnames';
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
  imageCarousel?: boolean;
  slideContainerStyles?: string;
};

export const Carousel: FC<CarouselProps> = ({
  children,
  vwHeightSetting,
  imageCarousel,
  slideContainerStyles,
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

  // reset slide index anytime the window resizes.
  // this prevents buginess from between pagition and next/prev buttons.
  useEffect(() => {
    window.addEventListener('resize', () => {
      setCurrentSlideIndex(0);
    });
  }, []);

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
        imageCarousel={imageCarousel}
        slideContainerStyles={slideContainerStyles}
      >
        {React.Children.map(children, (child, index) => (
          <Slide slideIndex={index} imageCarousel={imageCarousel}>
            {child}
          </Slide>
        ))}
      </SlideContainer>
      <div
        className={cn('pt-12', !imageCarousel ? 'hidden md:block' : 'block')}
      >
        <PrevButton>
          <BrandedIcon type="arrow-left" wrapperStyles="w-12" />
        </PrevButton>
        <NextButton>
          <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
        </NextButton>
      </div>
      <div
        className={cn(
          'pt-8 pb-4',
          !imageCarousel ? 'block md:hidden' : 'hidden',
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
  imageCarousel?: boolean;
};

export const Slide: FC<SlideProps> = ({
  children,
  slideIndex,
  imageCarousel = false,
}) => {
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
    <div
      ref={slideElement}
      className={cn(
        'carousel__slide h-full relative',
        !imageCarousel && currentSlideIndex != slideIndex
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
  imageCarousel = false,
  slideContainerStyles,
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
        imageCarousel ? 'h-[240px] md:h-[750px]' : '',
      )}
      style={{
        height: vwHeightSetting ? `${vwHeightSetting}vw` : undefined,
      }}
    >
      {/* Slide container inner div */}
      <div
        className={cn(
          'transition h-full flex flex-row',
          imageCarousel ? 'absolute top-0 left-0 flex flex-row' : '',
          slideContainerStyles,
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
