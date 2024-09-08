import { useAppDispatch } from "@/hooks/reduxHooks";
import { removeServiceModal } from "@/redux/features/serviceModalSlice";
import { BaseModalSize, ServiceModalName } from "@/types";
import BaseModal from "../BaseModal/BaseModal";
import { NotificationSuccessIcon } from "@/assets";

interface MakeOrderSuccessModalProps {
  index: number;
}

const MakeOrderSuccessModal = ({ index }: MakeOrderSuccessModalProps) => {
  const dispatch = useAppDispatch();

  const handleBackButton = () => {
    dispatch(removeServiceModal(ServiceModalName.MakeOrderSuccess));
  };

  const handleLeaveButton = () => {
    dispatch(removeServiceModal(ServiceModalName.MakeOrderSuccess));
  };

  return (
    <BaseModal
      width={BaseModalSize.Medium}
      onClose={handleBackButton}
      index={index}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <NotificationSuccessIcon />
        <h1
          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}
        >
          Дякуюємо за покупку!
        </h1>
        <p
          style={{ fontSize: "14px", fontWeight: "400", marginBottom: "40px" }}
        >
          Ваше замовлення обробляється менеджером!
        </p>
        <div
          style={{
            width: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleBackButton}
            // style={{
            //   color: theme.palette.primary.main,
            //   backgroundColor: theme.palette.common.white,
            //   border: `1px solid ${theme.palette.primary.main}`,
            //   "&:hover": {
            //     backgroundColor: theme.palette.primary.main,
            //     color: theme.palette.common.white,
            //     boxShadow: "none",
            //   },
            // }}
          >
            Назад
          </button>
          <button
            onClick={handleLeaveButton}
            // style={{
            //   color: theme.palette.common.white,
            //   backgroundColor: theme.palette.error.main,
            //   border: `1px solid ${theme.palette.error.main}`,
            //   "&:hover": {
            //     backgroundColor: theme.palette.common.white,
            //     border: `1px solid ${theme.palette.error.main}`,
            //     color: theme.palette.error.main,
            //     boxShadow: "none",
            //   },
            // }}
          >
            Повернутись до покупок
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default MakeOrderSuccessModal;
