export default (Rule) =>
  Rule.custom((value?: string) => {
    if (!value) return 'Required';
    if (value.toLowerCase() !== value) {
      return 'Must be all lowercase';
    }
    if (!/^([A-Za-z0-9-_])+$/.test(value)) {
      return 'Can only be letters, numbers, hyphens, and underscores (no spaces or special characters)';
    }
    return true;
  });

export const notRequiredIdValidationRule = (Rule) =>
  Rule.custom((value?: string) => {
    if (!value) return true;
    if (value.toLowerCase() !== value) {
      return 'Must be all lowercase';
    }
    if (!/^([A-Za-z0-9-_])+$/.test(value)) {
      return 'Can only be letters, numbers, hyphens, and underscores (no spaces or special characters)';
    }
    return true;
  });
