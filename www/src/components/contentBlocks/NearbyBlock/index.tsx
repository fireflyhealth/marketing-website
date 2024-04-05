import { FC } from 'react';
import { NearbyBlock as NearbyBlockType } from '@/types/sanity';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type Props = {
  nearbyBlock: NearbyBlockType;
};

export const NearbyBlock: FC<Props> = ({ nearbyBlock }) => {
  const {
    header,
    subnav,
    mapUrl,
    mobileAspectRatio,
    tabletAspectRatio,
    desktopAspectRatio,
  } = nearbyBlock;
  const windowDimensions = useWindowDimensions();

  const aspectRatio = (windowWidth: number) => {
    windowWidth > 600 && windowWidth < 800
      ? `${tabletAspectRatio.figureOne} / ${tabletAspectRatio.figureTwo}`
      : windowWidth > 800
        ? `${desktopAspectRatio.figureOne} / ${desktopAspectRatio.figureTwo}`
        : `${mobileAspectRatio.figureOne} / ${mobileAspectRatio.figureTwo}`;
  };
  return (
    <ContentBlockWrapper header={header} id={subnav?.contentBlockId}>
      <div
        className="rounded-2xl overflow-hidden w-full"
        style={{
          /* TODO: make calc values variables */
          /* max-height is based on 100% viewport height - top and bottom padding (48px each) - height of header - height of subnav */
          maxHeight: 'calc(100vh - 96px - 54px - 52px)',
          aspectRatio: `${windowDimensions ? aspectRatio(windowDimensions.width) : '16 / 9'}`,
        }}
      >
        <iframe src={mapUrl} width="100%" height="100%" title="My file" />
      </div>
    </ContentBlockWrapper>
  );
};
