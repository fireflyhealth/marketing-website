import React, { FC } from 'react';
import cn from 'classnames';
import {
  HeaderQrCodeChildBlock as HeaderQrCodeChildBlockType,
  RichImage,
  Link as LinkType,
  Maybe,
} from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { Link } from '@/atoms/Link';
import { RichText } from '@/components/RichText';
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

const StoreImage: FC<{ storeImage: Maybe<RichImage> }> = ({ storeImage }) => {
  if (!storeImage) return null;

  return (
    <SanityImage
      width={storeImage.asset.metadata.dimensions.width}
      height={storeImage.asset.metadata.dimensions.height}
      rounded={false}
      image={storeImage}
      sizes={['20vw']}
    />
  );
};

const StoreImageLink: FC<{
  storeImage: Maybe<RichImage>;
  storeLink: Maybe<LinkType>;
}> = ({ storeImage, storeLink }) => {
  if (!storeImage && !storeLink) {
    return null;
  }

  if (storeImage && storeLink) {
    return (
      <Link
        key={storeLink._type}
        link={storeLink}
        className={cn(QrCodeSmallImageLink)}
      >
        <StoreImage storeImage={storeImage} />
      </Link>
    );
  }

  return <StoreImage storeImage={storeImage} />;
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
              {qrCode.storeLinks.appStoreimage && (
                <StoreImageLink
                  storeImage={qrCode.storeLinks.appStoreimage}
                  storeLink={qrCode.storeLinks.appStoreLink}
                />
              )}
              {qrCode.storeLinks.playStoreimage && (
                <StoreImageLink
                  storeImage={qrCode.storeLinks.playStoreimage}
                  storeLink={qrCode.storeLinks.playStoreLink}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
