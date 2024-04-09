import React, {
  FC,
  useState,
  useEffect,
  useContext,
  useRef,
  RefObject,
} from 'react';
import cn from 'classnames';
import debounce from 'lodash/debounce';
import { useSwipeable } from 'react-swipeable';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { WithChildren } from '@/types/sanity';
import { carouselThreshold } from '@/constants';

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
  setSlideContainerLeft: React.Dispatch<React.SetStateAction<number>>;
  slideContainerDragLeft: number;
  setSlideContainerDragLeft: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * This type matches events passed to useSwipeable handlers
 */
type HandledEvents =
  | React.MouseEvent<Element, MouseEvent>
  | TouchEvent
  | MouseEvent;

const CarouselContext = React.createContext<ContextValue | null>(null);

export const useCarousel = () => {
  const ctx = useContext(CarouselContext);
  if (ctx === null) {
    throw new Error('useCarousel must be within a CarouselProvider');
  }
  return ctx;
};

/**
 * Utils
 */

/* Calculates the maximum left amount the carousel should be allowed to
 * be set to.
 * This is used to prevent blank space and disable the next button */
const getMinLeft = (innerElement: HTMLDivElement | null): number => {
  /* If the ref is not initialized, return a dummy value. */
  if (!innerElement || !innerElement.parentElement) return -2000;
  return -(innerElement.offsetWidth - innerElement.parentElement.offsetWidth);
};

/**
 * Main component
 */
type CarouselProps = WithChildren & {
  /** isImageCarousel handles styles for image carousels */
  isImageCarousel?: boolean;
};

export const Carousel: FC<CarouselProps> = ({ children, isImageCarousel }) => {
  const slideCount = React.Children.count(children);
  const slideInnerRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  /* The left position of the container. This should always be the edge of the active
   * slide. */
  const [desiredSlideContainerLeft, setSlideContainerLeft] = useState(0);
  /* A temporary value to add or subtract from the left while the user is
   * dragging */
  const [slideContainerDragLeft, setSlideContainerDragLeft] = useState(0);

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

  const minLeft = getMinLeft(slideInnerRef.current);
  const leftIsBelowMin = desiredSlideContainerLeft < minLeft;
  const actualSlideContainerLeft =
    /* Constrain the desired slide container left by the minimum value
     * to prevent over-scrolling */
    Math.max(desiredSlideContainerLeft, minLeft) +
    /* Add the drag value afterwards so the user can still "scoot" the
     * container beyond the boundaries - it will snap back to the right
     * place when they stop scrolling. */
    slideContainerDragLeft;

  return (
    <CarouselContext.Provider
      value={{
        slideCount,
        slideContainerLeft: actualSlideContainerLeft,
        setSlideContainerLeft,
        slideContainerDragLeft,
        setSlideContainerDragLeft,
        currentSlideIndex,
        setCurrentSlideIndex,
        goPrev,
        goNext,
      }}
    >
      <SlideContainer
        slideInnerRef={slideInnerRef}
        minLeft={minLeft}
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
        className={cn(
          !isImageCarousel ? 'hidden md:block pt-4' : 'block pt-12',
        )}
      >
        <PrevButton disabled={currentSlideIndex === 0} goPrev={goPrev}>
          <BrandedIcon type="arrow-left" wrapperStyles="w-12" />
        </PrevButton>
        <NextButton
          disabled={leftIsBelowMin || currentSlideIndex === slideCount - 1}
          goNext={goNext}
        >
          <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
        </NextButton>
      </div>
      {/* Pagination (dots) component */}
      <div
        className={cn('pt-8', !isImageCarousel ? 'block md:hidden' : 'hidden')}
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

type SlideContainerProps = CarouselProps & {
  slideInnerRef: RefObject<HTMLDivElement>;
  minLeft: number;
};

export const SlideContainer: FC<SlideContainerProps> = ({
  children,
  slideInnerRef,
  minLeft,
  isImageCarousel = false,
}) => {
  const {
    slideContainerLeft,
    slideContainerDragLeft,
    setSlideContainerDragLeft,
    goNext,
    goPrev,
  } = useCarousel();

  const handleTouchOrMouseEvents = (event: HandledEvents) => {
    event.preventDefault();

    // determine left or right direction based on pos/neg dragLeft
    if (slideContainerDragLeft * -1 >= carouselThreshold) {
      goNext();
    } else if (slideContainerDragLeft * -1 <= -carouselThreshold) {
      goPrev();
    }
    setSlideContainerDragLeft(0);
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      const diff = eventData.deltaX;
      setSlideContainerDragLeft(diff);
    },
    onTouchStartOrOnMouseDown: ({ event }) => {
      handleTouchOrMouseEvents(event);
    },
    onTouchEndOrOnMouseUp: ({ event }) => {
      handleTouchOrMouseEvents(event);
    },
    preventScrollOnSwipe: false,
    trackMouse: true,
  });

  return (
    <div className={cn('relative w-full', isImageCarousel ? 'h-[45vw]' : '')}>
      {/* Swipe container */}
      <div
        className={cn(
          'h-full flex flex-row',
          slideContainerDragLeft === 0 ? 'transition' : '',
        )}
        style={{
          transform: `translateX(${slideContainerLeft}px)`,
        }}
        {...handlers}
      >
        {/* Slide container inner div */}
        <div ref={slideInnerRef} className="h-full flex flex-row">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Pagination: FC = () => {
  const { slideCount, currentSlideIndex, setCurrentSlideIndex } = useCarousel();

  return (
    <div className="flex flex-row space-x-1 justify-center">
      {Array.from(Array(slideCount)).map((_slide, index) => (
        <button
          key={index}
          className={cn(
            'w-[11px] h-[11px] rounded-full',
            currentSlideIndex === index ? 'bg-black' : 'bg-grey-medium',
          )}
          onClick={() => setCurrentSlideIndex(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

type ButtonProps = WithChildren & {
  disabled?: boolean;
};
type PrevButtonProps = ButtonProps & {
  goPrev: () => void;
};

export const PrevButton: FC<PrevButtonProps> = ({
  disabled,
  goPrev,
  children,
}) => {
  return (
    <button
      className="element-focus"
      disabled={disabled}
      onClick={goPrev}
      aria-label="Go to previous slide"
    >
      {children}
    </button>
  );
};

type NextButtonProps = ButtonProps & {
  goNext: () => void;
};

export const NextButton: FC<NextButtonProps> = ({
  children,
  disabled,
  goNext,
}) => {
  return (
    <button
      className="ml-5 element-focus"
      disabled={disabled}
      onClick={goNext}
      aria-label="Go to next slide"
    >
      {children}
    </button>
  );
};
