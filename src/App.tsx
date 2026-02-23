import AppRouter from './components/AppRouter';
import { Global } from './styled/global';
import { CookiesProvider } from 'react-cookie';
import AuthProvider from './context/authProvider';
import ExpensesProvider from './context/expensesProvider';
import ToastProvider from './context/toastProvider';
import { Theme } from './context/theme';

function App() {
  return (
    <Theme>
      <CookiesProvider>
        <ToastProvider>
          <AuthProvider>
            <ExpensesProvider>
              <Global />
              <AppRouter />
            </ExpensesProvider>
          </AuthProvider>
        </ToastProvider>
      </CookiesProvider>
    </Theme>
  );
}

export default App;
