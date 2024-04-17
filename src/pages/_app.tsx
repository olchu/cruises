import { ReactElement, ReactNode } from 'react';
import type { AppContext, AppProps } from 'next/app';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import App from 'next/app';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: any) => ReactNode;
};

type AppOwnProps = { menu: string };

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  menu: string;
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  console.log('APPPP', pageProps);
  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />, {
        ...pageProps,
      })}
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const props = { ...appProps, menu: 'hello' };
  return props;
};

export default MyApp;
