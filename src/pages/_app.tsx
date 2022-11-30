import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';

import Head from 'next/head';
import { ModalProvider } from '../contexts/ModalContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Meache.app</title>
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <ModalProvider>
              <Component {...pageProps} />
            </ModalProvider>
            <ToastContainer />
          </Layout>
          <GlobalStyle />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
