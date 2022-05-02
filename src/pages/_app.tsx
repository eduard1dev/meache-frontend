import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
        <GlobalStyle />
      </ThemeProvider>
    </AuthProvider>
  );
}
