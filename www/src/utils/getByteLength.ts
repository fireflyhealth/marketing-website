export const getByteLength = (value: string) =>
  new TextEncoder().encode(value).length;
