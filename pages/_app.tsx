import type { AppProps } from 'next/app'
import Layout from '@/components/Layout';
import { getLogger } from '@/utils/logger';
import { AppProvider } from '@/context';
import '@/styles/globals.css';
import '@/styles/table.css';

export default function App({ Component, pageProps }: AppProps) {

  const logger = getLogger("App");
  logger.info("starting App...");

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
