import React, { FC } from 'react';
import { PressKitPage } from '@/types/sanity';

type PressKitPageViewProps = {
  pressKitPage: PressKitPage;
};

export const PressKitPageView: FC<PressKitPageViewProps> = ({
  pressKitPage,
}) => {
  return <div>{pressKitPage.title}</div>;
};
