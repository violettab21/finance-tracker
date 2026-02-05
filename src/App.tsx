import { BrowserRouter } from 'react-router';
import AppRouter from './components/AppRouter';
import { Global } from './styled/global';
import { CookiesProvider } from 'react-cookie';
import AuthProvider from './context/authProvider';
import ExpensesProvider from './context/expensesProvider';
import ToastProvider from './context/toastProvider';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <ExpensesProvider>
              <Global />
              <AppRouter />
            </ExpensesProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
