import { getFromLocal } from 'utils/localStorage';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AuthVerify({ logOut }: { logOut: () => JSX.Element }) {
  const location = useLocation();

  useEffect(() => {
    const user = getFromLocal('user');

    if (user) {
      const expiredTime = user.exp;

      if (expiredTime * 1000 < Date.now()) {
        logOut();
      }
    }

    if (!user) {
      logOut();
    }
  }, [location, logOut]);

  return <></>;
}

export default AuthVerify;
