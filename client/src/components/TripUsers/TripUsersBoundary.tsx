import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { ErrorBoundary } from '../common/ErrorBoundary';
import TripUsers from './TripUsers';

type TripUsersBoundaryProps = { tripId: number };

const TripUsersBoundary = ({ tripId }: TripUsersBoundaryProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <TripUsers tripId={tripId}/>
      </Suspense>
    </ErrorBoundary>
  );
};

export default TripUsersBoundary;