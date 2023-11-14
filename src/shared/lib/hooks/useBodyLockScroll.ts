import { useLayoutEffect } from 'react';

export const useBodyLockScroll = (lock: boolean) => {
  useLayoutEffect(() => {
    if (document.body && lock) {
      document.body.style.overflowY = 'hidden';
      document.body.style.height = '100vh'; //fix no-scrol for safari
      document.body.style.width = '100vw'; //fix no-scrol for safari
      document.body.style.position = 'fixed'; //fix no-scrol for safari
      return () => {
        if (document.body) {
          document.body.style.overflowY = 'initial';
          document.body.style.height = 'initial';
          document.body.style.position = 'initial';
        }
      };
    }
  }, [lock]);
};
