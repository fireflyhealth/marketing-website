import React, { FC } from 'react';
import cn from 'classnames';
import { HeaderQrCodeChildBlock as HeaderQrCodeChildBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { QRCode } from '@/components/QRCode';
import { Wrapper, Heading, Body } from './styles';

type HeaderQrCodeChildBlockProps = {
  headerQrCodeChildBlock: HeaderQrCodeChildBlockType;
};

export const HeaderQrCodeChildBlock: FC<HeaderQrCodeChildBlockProps> = ({
  headerQrCodeChildBlock,
}) => {
  const { heading, body, qrCode } = headerQrCodeChildBlock;

  return (
    <div className={cn(Wrapper)}>
      <h1 className={cn(Heading)}>{heading}</h1>
      {body && <RichText className={cn(Body)} content={body} />}
      <QRCode qrCode={qrCode} />
    </div>
  );
};
