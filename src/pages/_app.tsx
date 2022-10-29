// Dependencies
import { AppProps } from 'next/app';

// Components
import { Layout } from '../components/Layout';

// Styles
import './globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  // Here we can add all providers, layout and aditionals propss
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
