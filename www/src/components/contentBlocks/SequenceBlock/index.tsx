import { FC } from 'react';
import * as SanityTypes from '@/types/sanity';

type Props = {
  sequenceBlock: SanityTypes.SequenceBlock;
};

export const SequenceBlock: FC<Props> = ({ sequenceBlock }) => {
  return <div>Sequence Block</div>;
};
