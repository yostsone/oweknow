import React, { JSX } from 'react';
import { NotificationProvider } from 'src/services/notificationService';
import { CssBaseline, Container, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripPage from './pages/TripPage/TripPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { TripListBoundary } from './pages/TripList/TripListBoundary';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#4e9cff',      // light blue accent (buttons, highlights)
      light: '#b3dbff',     // lighter blue (hover, highlight)
      dark: '#006dcc',      // deeper blue for contrast
      contrastText: '#4e2e1e', // dark brown for text on primary
    },
    secondary: {
      main: '#ffca29',      // bright accent (yellow/gold)
      light: '#fff7d1',     // pale yellow for soft accents
      dark: '#c59400',      // deeper yellow/gold
      contrastText: '#4e2e1e', // dark brown for text on secondary
    },
    background: {
      default: '#f7fbff',   // almost white with a blue tint for main background
      paper: '#eaf3fb'
    },
    text: {
      primary: '#4e2e1e',   // dark brown for primary text
      secondary: '#795548', // lighter brown for secondary text
    },
  },
});

const App:React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <CssBaseline />
        <Header />
        <main>
          <QueryClientProvider client={queryClient}>
            <Container maxWidth="md">
              <NotificationProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<TripListBoundary />} />
                    <Route path="trip/:id" element={<TripPage />} />
                  </Routes>
                </Router>
              </NotificationProvider>
            </Container>
          </QueryClientProvider>
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
