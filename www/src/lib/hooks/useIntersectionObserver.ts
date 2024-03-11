import { useEffect, useReducer, useRef } from 'react';
import { usePrevious } from './usePrevious';

interface State {
  isIntersecting: boolean;
  isIntersectingOnce: boolean;
}

const INTERSECTION = 'INTERSECTION';

interface IsInViewAction {
  type: typeof INTERSECTION;
  isIntersecting: boolean;
}

type Action = IsInViewAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case INTERSECTION:
      return {
        isIntersectingOnce: state.isIntersectingOnce || action.isIntersecting,
        isIntersecting: action.isIntersecting,
      };

    default:
      throw new Error(`"${action.type}" is not a valid action`);
  }
};

const initialState: State = {
  /* Toggles between true & false as the item starts and stop intersecting. */
  isIntersecting: false,
  /* Will toggle to true *once* when the item intersects for the first time. */
  isIntersectingOnce: false,
};

type Config = {
  /* --- IntersectionObserver config --- */

  /* the *other* element that we want to wait for the element to intersect
   *
   * Examples:
   *
   * root === null -> trigger when the element enters or leaves the viewport.
   * root === <DOM ref of your sticky Nav bar> ->
   *   trigger when the element has scrolled underneath the nav bar
   **/
  root?: Element | Document | null;
  /* A CSS-margins-like stringrepresting how much we should grow or shrink the area
   * in which we are waiting for the element to intersect.
   *
   * For example:
   *
   * "200px 0" -> trigger when the element is 200px above or below the root
   * "-10% 0 0 0" -> trigger when the element is 10% of the way down from
   *                 the top, or just entering the bottom of the root
   */
  rootMargin?: string;
  /* (0 to 1) how much of the element should be visible before we trigger.
   * 0: trigger when the element has intersected by at least 1px
   * 0.5: trigger when the element has intersected by 50%
   * 1: trigger when the element has fully intersected with the root */
  threshold?: number;

  /* --- Callbacks --- */

  /* Triggered every time the elements intersect */
  onIntersection?: () => void;
  /* Triggered the first time the elements intersect */
  onIntersectionOnce?: () => void;
  /* Triggered every time the elements stop intersecting */
  onIntersectionLeave?: () => void;
};

/**
 * A hook that implements IntersectionObserver,
 * use this to determine when an element is in the viewport, or
 * intersecting with another node.
 *
 * - Use the return values to know the state of when elements are
 *   intersecting or not
 * - Pass in callbacks to trigger effects when the elements start
 *   or stop intersecting
 *
 * See more about IntersectionObserver;
 * https://developer.mozilla.org/docs/Web/API/IntersectionObserverEntry
 *
 * Adapted from:
 * https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
 */
export const useIntersectionObserver = (
  /* The element that we are waiting to intersect with the root */
  element: React.RefObject<HTMLElement>,
  config?: Config,
) => {
  const {
    root,
    rootMargin,
    threshold,
    onIntersection,
    onIntersectionOnce,
    onIntersectionLeave,
  } = Object.assign({}, config);

  const [state, dispatch] = useReducer(reducer, initialState);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer?.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting } = entry;
        dispatch({ type: INTERSECTION, isIntersecting });
      },
      { rootMargin, threshold, root },
    );

    const { current: currentObserver } = observer;

    if (element.current) currentObserver.observe(element.current);

    return () => currentObserver.disconnect();
  }, [element, root, rootMargin, threshold]);

  /* Callbacks */

  const prevIsIntersecting = usePrevious(state.isIntersecting);
  const prevIsIntersectingOnce = usePrevious(state.isIntersectingOnce);

  if (
    (prevIsIntersecting === false || prevIsIntersecting === null) &&
    state.isIntersecting === true &&
    onIntersection
  ) {
    onIntersection();
  }

  if (
    prevIsIntersecting === true &&
    state.isIntersecting === false &&
    onIntersectionLeave
  ) {
    onIntersectionLeave();
  }
  if (
    (prevIsIntersectingOnce === false || prevIsIntersectingOnce === null) &&
    state.isIntersectingOnce === true &&
    onIntersectionOnce
  ) {
    onIntersectionOnce();
  }

  return state;
};
