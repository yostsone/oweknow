import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import TripListContainer from '../../components/Trips/TripListContainer';

export const TripListBoundary = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <TripListContainer />
      </Suspense>
    </ErrorBoundary>
  );
};