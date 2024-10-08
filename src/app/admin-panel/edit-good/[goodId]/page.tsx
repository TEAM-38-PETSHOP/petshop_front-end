import styles from '../editGood.module.scss';

interface Props {
  params: {
    goodId: string;
  };
}

export default function EditGood({ params: { goodId } }: Props) {
  return (
    <div className={styles.editGood}>
      Edit good with id: {goodId}
    </div>
  );
}
