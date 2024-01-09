import { MatcherFunction } from '@testing-library/react';

/**
 * @testing-library's getByText function does not match text content
 * when it is broken up by multiple HTML elements. For instance:
 *
 * getByText('Adventures of Blondie and Dagwood')
 *
 * will match:
 *   <p>Adventures of Blondie and Dagwood</p>
 *
 * but will not match:
 *   <p>Adventures of <b>Blondie and Dagwood</b></p>
 *
 * Use this matcher function to find matches split up by HTML elements:
 *
 * getByText(matchTextContent('Adventures of Blondie and Dagwood'))
 *
 *
 */
export const matchTextContent =
  (searchValue: string): MatcherFunction =>
  (content: string, element: Element | null): boolean => {
    if (element && element.textContent === searchValue) return true;
    return false;
  };
