import React from 'react';
import '../styles/globals.css';

const MyApp: React.FC = ({ Component, pageProps }: any) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
