import React, { FC } from 'react';
import cn from 'classnames';
import { QrCodeObject, Link as LinkType, Maybe } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { GenericImage } from '@/atoms/Image/GenericImage';
import { Link } from '@/atoms/Link';
import googlePlayStoreBadge from '../../assets/images/google-play-store-badge.png';
import appStoreBadge from '../../assets/images/app-store-badge.png';
import {
  QrCodeSmallImageLink,
  QrCodeWrapper,
  QrCodeImage,
  QrCodeText,
  QrCodeSmallImagesWrapper,
} from './styles';

const StoreImage: FC<{
  store: 'googlePlayStore' | 'appStore';
  className?: string;
}> = ({ store }) => {
  const isAppStore = store === 'appStore';
  const image = isAppStore ? appStoreBadge : googlePlayStoreBadge;
  return (
    <img
      src={image.src}
      width={image.width}
      height={image.height}
      alt={isAppStore ? 'App store image' : 'Google play store image'}
      sizes={'135px'}
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

type QRCodeProps = {
  qrCode: QrCodeObject;
  smallLabelSize?: boolean;
  imagePriority?: boolean;
};

export const QRCode: FC<QRCodeProps> = ({
  qrCode,
  smallLabelSize,
  imagePriority,
}) => {
  return (
    <div className={cn(QrCodeWrapper)}>
      {qrCode.qrCodeImage && (
        <SanityImage
          className={cn(QrCodeImage)}
          image={qrCode.qrCodeImage}
          sizes="30vw"
          priority={imagePriority}
        />
      )}
      {qrCode.text && (
        <p
          className={cn(
            QrCodeText,
            smallLabelSize ? 'font-size-10' : 'font-size-8',
          )}
        >
          {qrCode.text}
        </p>
      )}
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
  );
};
