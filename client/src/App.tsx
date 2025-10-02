import React, { JSX } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripList from './pages/TripList/TripList';
import TripPage from './pages/TripPage/TripPage';

const queryClient = new QueryClient();

const App:React.FC = () => {
  return (
      <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<TripList />} />
          <Route path="trip/:id" element={<TripPage />} />
        </Routes>
      </Router>
      </QueryClientProvider>
  );
};

export default App;
