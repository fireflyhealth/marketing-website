import { FC } from 'react';
import { NearbyBlock as NearbyBlockType } from '@/types/sanity';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { BREAK_POINTS_SM, BREAK_POINTS_MD } from '@/constants';
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
  return (
    <ContentBlockWrapper header={header} id={subnav?.contentBlockId}>
      <div
        className="rounded-2xl overflow-hidden w-full"
        style={{
          /* TODO: make calc values variables */
          /* max-height is based on 100% viewport height - top and bottom padding (48px each) - height of header - height of subnav */
          maxHeight: 'calc(100vh - 96px - 54px - 52px)',
          aspectRatio: `${
            /* First check windowDimensions is defined */
            windowDimensions
              ? /* Check if windowDimensions is within tablet breakpoints */
                windowDimensions.width > BREAK_POINTS_SM &&
                windowDimensions.width < BREAK_POINTS_MD
                ? `${tabletAspectRatio.figureOne} / ${tabletAspectRatio.figureTwo}`
                : /* Check if windowDimensions is within Desktop breakpoints */
                  windowDimensions.width > BREAK_POINTS_MD
                  ? `${desktopAspectRatio.figureOne} / ${desktopAspectRatio.figureTwo}`
                  : /* Return mobile aspect ratio if none of the other breakpoint checks pass */
                    `${mobileAspectRatio.figureOne} / ${mobileAspectRatio.figureTwo}`
              : /* Default to 16 / 9 aspect ratio if windowDimensions is not defined */
                '16 / 9'
          }`,
        }}
      >
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          title="Firefly Mapbox"
        />
      </div>
    </ContentBlockWrapper>
  );
};
