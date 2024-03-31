import RadioGroup from "../../RadioGroup/RadioGroup";
import style from "./storeHeader.module.scss";

export default function StoreHeader() {
  return (
    <div className={style.header}>
      <h1 className={style.header__title}>Обери категорію товарів</h1>

      <RadioGroup />
    </div>
  );
}
