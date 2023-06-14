import type { AppProps } from 'next/app'
import Layout from '@/components/Layout';
import { AppProvider } from '@/context';
import '@/styles/globals.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
