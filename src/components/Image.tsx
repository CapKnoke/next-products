import React from 'react';
import NextImage from 'next/image';

interface IImageProps {
  src: string;
  height?: string | number;
  width?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  minWidth?: string | number;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
}

const Image: React.FC<IImageProps> = ({
  src,
  height,
  width,
  className,
  objectFit,
  maxHeight,
  minHeight,
  maxWidth,
  minWidth,
}) => {
  return (
    <div
      className={`relative${className ? ` ${className}` : ''}`}
      style={{
        height: height || '100%',
        width: width || '100%',
        maxHeight,
        minHeight,
        maxWidth,
        minWidth,
      }}
    >
      <NextImage src={src} objectFit={objectFit || 'contain'} layout="fill" />
    </div>
  );
};

export default Image;
