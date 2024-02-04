
import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import DarkTheme from './theme/DarkTheme';
//import HomePage from './customer/pages/HomePage/HomePage';
import Routers from './Routers/Routers';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <AuthProvider>
        <CartProvider>
          <CssBaseline />
          <Routers />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>


  );
}

export default App;
