import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import TripPageContainer from '../../components/Trip/TripPageContainer';

const TripPageBoundary = () => {
  return (
      <ErrorBoundary>
        <Suspense fallback={<CircularProgress color="secondary" />}>
          <TripPageContainer />
        </Suspense>
      </ErrorBoundary>
  );
};

export default TripPageBoundary;