'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const PageLoader = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="2px"
        color="#ffbd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default PageLoader;