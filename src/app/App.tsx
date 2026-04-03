import { RouterProvider } from 'react-router';
import { AppProvider } from './context/AppContext';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AppProvider>
  );
}

export default App;
