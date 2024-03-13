import React, { FC } from 'react';
import cn from 'classnames';
import {
  HeaderQrCodeChildBlock as HeaderQrCodeChildBlockType,
  Link as LinkType,
  Maybe,
} from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { GenericImage } from '@/atoms/Image/GenericImage';
import { Link } from '@/atoms/Link';
import { RichText } from '@/components/RichText';
import googlePlayStoreBadge from '@/assets/images/google-play-store-badge.png';
import appStoreBadge from '@/assets/images/app-store-badge.png';
import {
  Wrapper,
  Heading,
  Body,
  QrCodeSmallImageLink,
  QrCodeWrapper,
  QrCodeImage,
  QrCodeText,
  QrCodeSmallImagesWrapper,
} from './styles';

type HeaderQrCodeChildBlockProps = {
  headerQrCodeChildBlock: HeaderQrCodeChildBlockType;
};

const StoreImage: FC<{
  store: 'googlePlayStore' | 'appStore';
  className?: string;
}> = ({ store }) => {
  const isAppStore = store === 'appStore';
  const image = isAppStore ? appStoreBadge : googlePlayStoreBadge;
  return (
    <GenericImage
      aspectRatio={image.height / image.width}
      src={image}
      alt={isAppStore ? 'App store image' : 'Google play store image'}
      sizes={['135px']}
    />
  );
};

const StoreImageLink: FC<{
  store: 'googlePlayStore' | 'appStore';
  storeLink: Maybe<LinkType>;
}> = ({ store, storeLink }) => {
  if (storeLink) {
    return (
      <div className={cn(QrCodeSmallImageLink)}>
        <Link key={storeLink._type} link={storeLink}>
          <StoreImage store={store} />
        </Link>
      </div>
    );
  }

  return (
    <div className={cn(QrCodeSmallImageLink)}>
      <StoreImage store={store} />;
    </div>
  );
};

export const HeaderQrCodeChildBlock: FC<HeaderQrCodeChildBlockProps> = ({
  headerQrCodeChildBlock,
}) => {
  const { heading, body, qrCode } = headerQrCodeChildBlock;

  return (
    <div className={cn(Wrapper)}>
      <h1 className={cn(Heading)}>{heading}</h1>
      {body && <RichText className={cn(Body)} content={body} />}
      {qrCode && (
        <div className={cn(QrCodeWrapper)}>
          {qrCode.qrCodeImage && (
            <SanityImage
              className={cn(QrCodeImage)}
              image={qrCode.qrCodeImage}
              sizes="30vw"
            />
          )}
          {qrCode.text && <p className={cn(QrCodeText)}>{qrCode.text}</p>}
          {qrCode.storeLinks && (
            <div className={cn(QrCodeSmallImagesWrapper)}>
              <StoreImageLink
                store="googlePlayStore"
                storeLink={qrCode.storeLinks.playStoreLink}
              />
              <StoreImageLink
                store="appStore"
                storeLink={qrCode.storeLinks.appStoreLink}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
