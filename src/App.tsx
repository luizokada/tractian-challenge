import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/themes/default';
import AppRoutes from './routes';
import CompanieProvider from './context/Companie';
import GlobalStyles from './styles/GlobalStyles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <CompanieProvider>
          <AppRoutes />
          <GlobalStyles />
        </CompanieProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
