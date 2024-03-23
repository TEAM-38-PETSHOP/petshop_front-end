import Link from 'next/link';
import styles from './productCard.module.scss';
import Image from 'next/image';
type Props = {
  product: {
    id: number;
    name: string;
    description: string;
    carPrice: number;
    price?: number;
    image: string;
  };
};
export default function ProductCard({ product }: Props) {
  return (
    <div
      className={styles.productCard}
      data-testid="product-card"
    >
      <Link
        href={`/product/${product.id}`}
        className={styles.productCard__image}
      >
        <Image
          src={product.image}
          width={215}
          height={215}
          alt={product.name}
        />
      </Link>
      <h3 className={styles.productCard__title}>{product.name}</h3>
      <p className={styles.productCard__description}>{product.description}</p>
      <p className={styles.productCard__price}>{product.price} грн</p>
    </div>
  );
}
