import { BrowserRouter } from 'react-router';
import AppRouter from './components/AppRouter';
import { Global } from './styled/global';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Global />
        <AppRouter />
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
