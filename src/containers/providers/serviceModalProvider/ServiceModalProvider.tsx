"use client";

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

const MakeCheckEmailModal = React.lazy(
  () => import("@/components/modals/MakeCheckEmailModal/MakeCheckEmailModal")
);

const MakeResetPasswordModal = React.lazy(
  () =>
    import("@/components/modals/MakeResetPasswordModal/MakeResetPasswordModal")
);

const AreYouSureModal = React.lazy(
  () => import("@/components/modals/AreYouSureModal/AreYouSureModal")
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

      case ServiceModalName.MakeCheckEmail:
        return (
          <Suspense fallback={<></>}>
            <MakeCheckEmailModal index={ServiceModalBaseIndex + index} />
          </Suspense>
        );

      case ServiceModalName.MakeResetPassword:
        return (
          <Suspense fallback={<></>}>
            <MakeResetPasswordModal index={ServiceModalBaseIndex + index} />
          </Suspense>
        );

      case ServiceModalName.AreYouSure:
        return (
          <Suspense fallback={<></>}>
            <AreYouSureModal index={ServiceModalBaseIndex + index} />
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
