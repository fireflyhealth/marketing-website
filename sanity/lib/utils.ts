export const camelCaseToSentence = (value: string): string => {
  /* Make the first character uppercase */
  const upCased = [value.charAt(0).toUpperCase(), ...value.slice(1)].join('');
  /* Find all sets of strings that start with an upper-case
   * letter and are followed by lower-case */
  const matches = upCased.match(/([A-Z][a-z]+)/g);
  if (!matches) {
    throw new Error(`Could not parse "${value}" to sentence`);
  }
  return Array.from(matches).join(' ');
};
