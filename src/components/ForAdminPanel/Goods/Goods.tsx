import CatalogHeader from "@/components/ForCatalog/CatalogHeader/CatalogHeader";
import CatalogMain from "@/components/ForCatalog/CatalogMain/CatalogMain";
import styles from "./goods.module.scss";

export const Goods = () => {
  return (
    <div className={styles.goods}>
      <CatalogHeader
        categories={[]}
        category="all"
        type="admin-panel"
        className={styles.goods__header}
      />
      <CatalogMain
        category="all"
        className={styles.goods__main}
        type="admin-panel"
      />
    </div>
  );
};
