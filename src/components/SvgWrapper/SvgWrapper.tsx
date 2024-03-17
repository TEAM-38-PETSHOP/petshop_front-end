'use client';
import { ReactSVG } from 'react-svg';
import { Props } from 'react-svg/dist/types';
import Spinner from '../Loaders/Spinner';

export default function SvgWrapper({ src, className }: Props) {
  return (
    <ReactSVG
      src={src}
      className={className}
      loading={() => <Spinner />}
    />
  );
}
