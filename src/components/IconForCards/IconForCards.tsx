import classNames from 'classnames';
import styles from './iconForCards.module.scss';
import SvgWrapper from '@/components/SvgWrapper/SvgWrapper';

type Props = {
  icon: string;
  handler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  isFavorite?: boolean;
  className?: string;
};

export default function IconForCards({
  icon,
  handler,
  isActive,
  isFavorite,
  className,
}: Props) {
  return (
    <button
      type="button"
      data-testid="icon-for-cards"
      className={classNames([styles.iconForCards], className, {
        [styles.iconForCards__favorite]: isFavorite,
        [styles.iconForCards__active]: isActive,
      })}
      onClick={handler}
    >
      <SvgWrapper src={icon} />
    </button>
  );
}
