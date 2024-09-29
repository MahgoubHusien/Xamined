// pages/_app.tsx
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import '@/styles/globals.css'; // Import your global CSS

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
