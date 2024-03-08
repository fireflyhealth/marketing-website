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

/**
 * Generic function for testing to see if an element has an attribute
 * or is within an element that has the attribute.
 */
const hasAttribute = (attributeName: string, testValue: string) => {
  const testElement = (element: HTMLElement): boolean => {
    if (element.getAttribute(attributeName) === testValue) return true;
    const parentElement = element.parentElement;
    if (parentElement) {
      return testElement(parentElement);
    }
    return false;
  };
  return testElement;
};

/**
 * Test to see if an element has a specific attribute value, or
 * is within a parent that has it.
 *
 * Usage:
 *
 * expect(isAriaHidden(getByText('Hidden Button'))).toBe(false)
 */
export const isAriaHidden = hasAttribute('aria-hidden', 'true');
export const isAriaSelected = hasAttribute('aria-selected', 'true');
