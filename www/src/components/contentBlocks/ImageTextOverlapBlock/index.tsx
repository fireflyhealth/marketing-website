import { FC } from 'react';
import * as SanityTypes from '@/types/sanity';

type Props = {
  imageTextOverlapBlock: SanityTypes.ImageTextOverlapBlock;
};

export const ImageTextOverlapBlock: FC<Props> = ({ imageTextOverlapBlock }) => {
  return <div>Image Text Overlap Block</div>;
};
