'use client';
import { Suspense, useState } from 'react';
import LeftBar from '../LeftBar/LeftBar';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import styles from './authBar.module.scss';
export default function AuthBar() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className={styles.authBar}>
      <LeftBar />
      <div className={styles.authBar__form}>
        <Suspense>
          <SignIn
            setIsSignIn={setIsSignIn}
            isSignIn={isSignIn}
          />
        </Suspense>
        <SignUp
          setIsSignIn={setIsSignIn}
          isSignIn={isSignIn}
        />
      </div>
    </div>
  );
}
