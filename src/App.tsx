import { BrowserRouter } from 'react-router';
import AppRouter from './components/AppRouter';
import { Global } from './styled/global';
import { CookiesProvider } from 'react-cookie';
import AuthProvider from './context/authProvider';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AuthProvider>
          <Global />
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
