import React, { Suspense, useEffect } from "react";
import { ServiceModalBaseIndex } from "@/constants";
import { ServiceModalName } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";

const MakeOrderSuccessModal = React.lazy(
  () =>
    import("@/components/modals/MakeOrderSuccessModal/MakeOrderSuccessModal")
);

const MakeOrderErrorModal = React.lazy(
  () => import("@/components/modals/MakeOrderErrorModal/MakeOrderErrorModal")
);

const ServiceModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modalKeys = Object.keys(useAppSelector((state) => state.serviceModal));

  useEffect(() => {
    const modalOverflow = document.body.style.overflow;

    document.body.style.overflow = modalKeys?.length ? "hidden" : modalOverflow;

    return () => {
      document.body.style.overflow = modalOverflow;
    };
  }, [modalKeys]);

  const getModalComponent = (key: ServiceModalName, index: number) => {
    switch (key) {
      case ServiceModalName.MakeOrderSuccess:
        return (
          <Suspense fallback={<></>}>
            <MakeOrderSuccessModal index={ServiceModalBaseIndex + index} />
          </Suspense>
        );

      case ServiceModalName.MakeOrderError:
        return (
          <Suspense fallback={<></>}>
            <MakeOrderErrorModal index={ServiceModalBaseIndex + index} />
          </Suspense>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {children}
      {modalKeys.map((key: any, index) => (
        <React.Fragment key={key}>
          {getModalComponent(key, index)}
        </React.Fragment>
      ))}
    </>
  );
};

export default ServiceModalProvider;
