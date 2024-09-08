"use client";
import { useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import ServiceModalProvider from "@/containers/providers/serviceModalProvider/ServiceModalProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <SessionProvider>
      <ReduxProvider store={storeRef.current}>
        <ServiceModalProvider>{children}</ServiceModalProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
