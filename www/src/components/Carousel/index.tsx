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
import { BREAK_POINTS_MD, carouselThreshold } from '@/constants';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';

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
  transformSlideContainerLeft: boolean;
  setTransformSlideContainerLeft: React.Dispatch<React.SetStateAction<boolean>>;
  slideContainerHeight: number;
  setSlideContainerHeight: React.Dispatch<React.SetStateAction<number>>;
  carouselContainerWidth: number;
  setCarouselContainerWidth: React.Dispatch<React.SetStateAction<number>>;
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
  /** isImageCarousel handles styling/functionality for image carousels */
  isImageCarousel?: boolean;
  /* isSingleSlideCarousel handles styling/functionality for single slide carousel */
  isSingleSlideCarousel?: boolean;
};

export const Carousel: FC<CarouselProps> = ({
  children,
  isImageCarousel,
  isSingleSlideCarousel,
}) => {
  const windowDimensions = useWindowDimensions();
  const slideCount = React.Children.count(children);
  const slideInnerRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  /* The left position of the container. This should always be the edge of the active
   * slide. */
  const [desiredSlideContainerLeft, setSlideContainerLeft] = useState(0);
  /* A temporary value to add or subtract from the left while the user is
   * dragging */
  const [slideContainerDragLeft, setSlideContainerDragLeft] = useState(0);
  /* A boolean to determine if the container should transform to the
   * deaired left position. */
  const [transformSlideContainerLeft, setTransformSlideContainerLeft] =
    useState(false);
  const [slideContainerHeight, setSlideContainerHeight] = useState<number>(100); // 100 represents 100%
  const [carouselContainerWidth, setCarouselContainerWidth] = useState(0);

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

  /* Set the current slide index to 0 when the inner slide container
   * is less than the width of it's parent container and
   * the width of the screen is below the MD breakpoint (800px) */
  useEffect(() => {
    if (!windowDimensions) return;
    if (
      windowDimensions.width > BREAK_POINTS_MD &&
      !transformSlideContainerLeft
    ) {
      setCurrentSlideIndex(0);
    }
  }, [windowDimensions, transformSlideContainerLeft]);

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
        transformSlideContainerLeft,
        setTransformSlideContainerLeft,
        slideContainerHeight,
        setSlideContainerHeight,
        carouselContainerWidth,
        setCarouselContainerWidth,
      }}
    >
      <SlideContainer
        slideInnerRef={slideInnerRef}
        minLeft={minLeft}
        isImageCarousel={isImageCarousel}
        isSingleSlideCarousel={isSingleSlideCarousel}
      >
        {React.Children.map(children, (child, index) => (
          <Slide
            slideIndex={index}
            isImageCarousel={isImageCarousel}
            isSingleSlideCarousel={isSingleSlideCarousel}
          >
            {child}
          </Slide>
        ))}
      </SlideContainer>
      {/* Prev/Next component */}
      <div
        className={cn(
          isSingleSlideCarousel
            ? 'hidden'
            : !isImageCarousel
              ? 'hidden md:block pt-4 md:pt-16'
              : 'block pt-12',
        )}
      >
        <PrevButton disabled={currentSlideIndex === 0} goPrev={goPrev}>
          <BrandedIcon type="arrow-left" wrapperStyles="w-12" />
        </PrevButton>
        <NextButton
          disabled={
            !transformSlideContainerLeft ||
            leftIsBelowMin ||
            currentSlideIndex === slideCount - 1
          }
          goNext={goNext}
        >
          <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
        </NextButton>
      </div>
      {/* Single Slide Carousel pagination arrows */}
      <div
        className={cn(
          isSingleSlideCarousel
            ? 'absolute top-1/2 -translate-y-1/2 w-full flex flex-row justify-between'
            : 'hidden',
        )}
      >
        <PrevButton disabled={currentSlideIndex === 0} goPrev={goPrev}>
          <BrandedIcon type="arrow-left" wrapperStyles="w-12" />
        </PrevButton>
        <NextButton
          disabled={
            !transformSlideContainerLeft ||
            leftIsBelowMin ||
            currentSlideIndex === slideCount - 1
          }
          goNext={goNext}
        >
          <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
        </NextButton>
      </div>
      {/* Pagination (dots) component */}
      <div
        className={cn(
          'pt-8',
          isSingleSlideCarousel
            ? 'block'
            : !isImageCarousel
              ? 'block md:hidden'
              : 'hidden',
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
  isSingleSlideCarousel?: boolean;
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
  isSingleSlideCarousel = false,
}) => {
  const { setSlideContainerLeft, currentSlideIndex, carouselContainerWidth } =
    useCarousel();
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
        'carousel__slide h-full relative block',
        !isImageCarousel &&
          !isSingleSlideCarousel &&
          'flex odd:mt-0 even:mt-8 md:even:mt-12',
      )}
      style={{
        width: `${
          isSingleSlideCarousel && carouselContainerWidth
            ? `${carouselContainerWidth}px`
            : 'auto'
        }`,
      }}
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
  isImageCarousel = false,
  isSingleSlideCarousel = false,
}) => {
  const {
    slideContainerLeft,
    slideContainerDragLeft,
    setSlideContainerDragLeft,
    goNext,
    goPrev,
    transformSlideContainerLeft,
    setTransformSlideContainerLeft,
    setCarouselContainerWidth,
  } = useCarousel();

  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const windowDimensions = useWindowDimensions();

  const [slideContainerWidth, setSlideContainerWidth] = useState<number>(0);
  const [innerSlideContainerWidth, setInnerSlideContainerWidth] =
    useState<number>(0);

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

  const isNotSwipeable =
    windowDimensions &&
    windowDimensions.width > BREAK_POINTS_MD &&
    !transformSlideContainerLeft;

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (isNotSwipeable) return;
      const diff = eventData.deltaX;
      setSlideContainerDragLeft(diff);
    },
    onTouchStartOrOnMouseDown: ({ event }) => {
      if (isNotSwipeable) return;
      handleTouchOrMouseEvents(event);
    },
    onTouchEndOrOnMouseUp: ({ event }) => {
      if (isNotSwipeable) return;
      handleTouchOrMouseEvents(event);
    },
    preventScrollOnSwipe: false,
    trackMouse: true,
  });

  useEffect(() => {
    if (!slideInnerRef.current) return;
    if (!slideInnerRef.current.parentElement) return;

    setSlideContainerWidth(slideInnerRef.current.parentElement.offsetWidth);
    setInnerSlideContainerWidth(slideInnerRef.current?.offsetWidth);
  }, [slideInnerRef, windowDimensions]);

  useEffect(() => {
    if (!carouselContainerRef.current) return;

    setCarouselContainerWidth(carouselContainerRef.current.clientWidth);
  }, [windowDimensions, setCarouselContainerWidth]);

  setTransformSlideContainerLeft(
    innerSlideContainerWidth > slideContainerWidth,
  );

  return (
    <div
      ref={carouselContainerRef}
      className={cn(
        'relative w-full',
        isImageCarousel && 'h-[45vw] max-h-[50vh]',
        isSingleSlideCarousel && 'overflow-hidden',
      )}
    >
      {/* Swipe container */}
      <div
        className={cn(
          'h-full',
          'flex flex-row',
          slideContainerDragLeft === 0 ? 'transition' : '',
        )}
        style={{
          transform: `${
            transformSlideContainerLeft
              ? `translateX(${slideContainerLeft}px)`
              : 'unset'
          }`,
        }}
        {...handlers}
      >
        {/* Slide container inner div */}
        <div
          ref={slideInnerRef}
          className="h-full flex flex-row"
          style={{
            height: `${!isImageCarousel && windowDimensions && windowDimensions.width > BREAK_POINTS_MD ? `${slideInnerRef.current?.clientHeight}px` : 'auto'}`,
          }}
        >
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
      className={cn(
        'element-focus',
        disabled ? 'hover:translate-x-0' : 'hover:-translate-x-[5px]',
      )}
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
      className={cn(
        'ml-5 element-focus',
        disabled ? 'hover:translate-x-0' : 'hover:translate-x-[5px]',
      )}
      disabled={disabled}
      onClick={goNext}
      aria-label="Go to next slide"
    >
      {children}
    </button>
  );
};
