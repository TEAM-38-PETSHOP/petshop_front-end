import styles from './buttonWithArrow.module.scss';
import Arrow from '@@/images/icons/arrow_right.svg';

type Props = {
  text: string;
};
export default function ButtonWithArrow({ text }: Props) {
  return (
    <button className={styles.buttonWithArrow}>
      {text}
      <Arrow />
    </button>
  );
}
