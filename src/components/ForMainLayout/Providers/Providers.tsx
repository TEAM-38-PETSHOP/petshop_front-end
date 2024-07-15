'use client';
import { useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { makeStore, AppStore } from '@/redux/store';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <SessionProvider>
      <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>
    </SessionProvider>
  );
}
