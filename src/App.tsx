import { BrowserRouter } from 'react-router';
import AppRouter from './components/AppRouter';
import { Global } from './styled/global';
import { CookiesProvider } from 'react-cookie';
import AuthProvider from './context/authProvider';
import ExpensesProvider from './context/expensesProvider';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AuthProvider>
          <ExpensesProvider>
            <Global />
            <AppRouter />
          </ExpensesProvider>
        </AuthProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
