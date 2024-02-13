import { MatcherFunction } from '@testing-library/react';

/**
 * @testing-library's getByText function does not match text content
 * when it is broken up by multiple HTML elements. For instance:
 *
 * getByText('Learn about Firefly Health')
 *
 * will match:
 *   <p>Learn about Firefly Health</p>
 *
 * but will not match:
 *   <p>Learn about <b>Firefly Health</b></p>
 *
 * Use this matcher function to find matches split up by HTML elements:
 *
 * getByText(matchTextContent('Learn about Firefly Health'))
 *
 *
 */
export const matchTextContent =
  (searchValue: string): MatcherFunction =>
  (content: string, element: Element | null): boolean => {
    const hasText = (element: Element) => element.textContent === searchValue;
    const elementHasText = Boolean(element && hasText(element));
    const childrenDontHaveText = Array.from(element?.children || []).every(
      (child) => !hasText(child),
    );
    return elementHasText && childrenDontHaveText;
  };
