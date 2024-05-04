import { useEffect, useRef, useState } from "react";
import style from "./modal.module.scss";
import useClickOutside from "@/hooks/useClickOutside";

type Props = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
};

export default function Modal({ children, title, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, () => {
    onClose();
  });

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className={style.modal}>
      <div className={style.modal__body} ref={modalRef}>
        <div className={style.modal__header}>
          <h2 className={style.modal__title}>{title}</h2>
          <button
            type="button"
            className={style.modal__close}
            onClick={handleCloseClick}
          ></button>
        </div>
        {children}
      </div>
    </div>
  );
}
