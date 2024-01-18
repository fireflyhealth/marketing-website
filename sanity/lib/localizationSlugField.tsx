import { Text, Stack, Flex, Box, TextInput } from '@sanity/ui';
import { FC } from 'react';

import * as Sanity from 'sanity';

// This component currently infers that the base language for every document will be english.
// This will not always be the case.
// So, in the future this component should be updated to be base language agnostic, or we can simply
// remove it if this does not provide any use.

const localizationSlugField: FC<Sanity.ObjectFieldProps<Sanity.SlugValue>> = (
  props,
) => {
  const {
    title,
    renderDefault,
    inputProps: { readOnly },
    value: initialValue,
  } = props;

  const initialSlug = (initialValue?.current || '') as string;

  // Get the current document
  const document = Sanity.useFormValue([]) as {
    language?: string;
  };

  // The language tag for the current document
  const lang = document.language;

  // If the document is a translation, set the slug to the parent's slug plus language tag
  const value = lang ? `${lang}/${initialSlug}` : initialSlug;

  return readOnly ? (
    <Stack space={1}>
      <Box paddingY={2}>
        <Stack space={2}>
          <Flex>
            <Text weight="semibold" size={1}>
              {title}
            </Text>
          </Flex>
          <Text size={1} muted>
            This slug is inherited from the base language and cannot be changed.
          </Text>
        </Stack>
      </Box>
      <TextInput value={value} readOnly />
    </Stack>
  ) : (
    renderDefault(props)
  );
};

export default localizationSlugField;
