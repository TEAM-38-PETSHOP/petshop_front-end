import { CloseIcon } from "@/assets";
import { ServiceModalConfig } from "@/types";

interface BaseModalProps extends ServiceModalConfig {
  title?: string;
  width: string;
  children?: React.ReactNode;
}

const BaseModal = ({
  onClose,
  index = 1000,
  width,
  title,
  children,
}: BaseModalProps) => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: index,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(80, 95, 111, 0.50)",
        padding: "0px",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          padding: "32px",
          width: "100%",
          maxWidth: width,
          backgroundColor: "white",
          borderRadius: "12px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: "20px",
            height: "20px",
            position: "absolute",
            top: "16px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          {title && (
            <h4 style={{ paddingBottom: "16px", margin: 0 }}>{title}</h4>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
