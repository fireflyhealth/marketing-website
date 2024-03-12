import { StructureResolverContext } from 'sanity/structure';

let warningElement: HTMLElement | null = null;

const getOrCreateWarningElement = (): HTMLElement => {
  if (warningElement) return warningElement;

  warningElement = document.createElement('div');
  const inner = document.createElement('div');

  warningElement.classList.add('warningElement');
  inner.classList.add('warningElement__inner');

  warningElement.appendChild(inner);

  const content = document.createTextNode(
    '⚠ Warning: You are editing the production dataset',
  );
  inner.appendChild(content);

  return warningElement;
};

export const addProductionDataWarning = async (
  context: StructureResolverContext,
) => {
  /* Get the first div within the nav bar grid */
  const warningElementContainer = document.querySelector('[data-ui="Navbar"]')
    ?.childNodes[0]?.childNodes[0] as HTMLElement;

  const warningElement = getOrCreateWarningElement();

  warningElementContainer?.appendChild(warningElement);
  if (
    context.dataset === 'production' &&
    window.location.hostname !== 'fireflyhealth.sanity.studio'
  ) {
    /* Show the warning if the user is editing Production outside
     * of the main deployment */
    warningElement.classList.add('warningElement--visible');
  } else {
    /* Otherwise, hide the warning */
    warningElement.classList.remove('warningElement--visible');
  }
};
