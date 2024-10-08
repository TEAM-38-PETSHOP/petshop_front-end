"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { removeServiceModal } from "@/redux/features/serviceModalSlice";
import { BaseModalSize, ServiceModalName } from "@/types";
import BaseModal from "../BaseModal/BaseModal";
import styles from "./deleteGoodModal.module.scss";
import Buttons from "@/components/Buttons/Buttons";
import { toast } from "react-toastify";
import { deleteProduct } from "@/helpers/fetchProducts";
import { Product } from "@/types/Product";

interface DeleteGoodModalProps {
  index: number;
}

const DeleteGoodModal = ({ index }: DeleteGoodModalProps) => {
  const dispatch = useAppDispatch();

  const { productId, token, setProducts } = useAppSelector(
    (state) => state.serviceModal[ServiceModalName.DeleteGood]
  );

  const handleCancelButton = () => {
    dispatch(removeServiceModal(ServiceModalName.DeleteGood));
  };

  const handleDeleteGood = async () => {
    const toastId = toast.loading("Чекаємо...");

    try {
      const response = await deleteProduct(productId, token);

      if (response) {
        toast.update(toastId, {
          render: "Товар успішно видалено!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        dispatch(removeServiceModal(ServiceModalName.DeleteGood));

        setProducts((prevProducts: Product[]) =>
          prevProducts.filter((p) => p.productId !== productId)
        );
      } else {
        toast.update(toastId, {
          render: "Помилка видалення товару!",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error: any) {
      toast.update(toastId, {
        render: "Сталася помилка!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <BaseModal
      width={BaseModalSize.Medium}
      onClose={handleCancelButton}
      index={index}
    >
      <div className={styles.deleteGood}>
        <h1 className={styles.deleteGood__title}>
          Ви точно хочете видалити товар?
        </h1>
        <p className={styles.deleteGood__paragraph}>
          Усі дані будуть видалені і не підлягатимуть відновленню
        </p>
        <div className={styles.deleteGood__buttons}>
          <Buttons
            firstBtn={{
              btnText: "Скасувати",
              onClick: handleCancelButton,
              type: "button",
              className: styles.deleteGood__buttons__cancel,
            }}
          />
          <Buttons
            firstBtn={{
              btnText: "Видалити товар",
              isBuy: true,
              onClick: handleDeleteGood,
              type: "button",
              className: styles.deleteGood__buttons__delete,
            }}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteGoodModal;
