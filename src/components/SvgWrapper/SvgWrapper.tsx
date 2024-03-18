'use client';
import { ReactSVG } from 'react-svg';
import { Props } from 'react-svg/dist/types';
import Image from 'next/image';

export default function SvgWrapper({ src, className }: Props) {
  return (
    <ReactSVG
      src={src}
      className={className}
      loading={() => (
        <Image
          src={src}
          width={25}
          height={25}
          alt="svg"
        />
      )}
    />
  );
}
