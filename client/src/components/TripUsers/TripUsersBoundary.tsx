import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { User } from '@shared/index';
import TripUsers from './TripUsers';

type TripUsersBoundaryProps = { tripId: number, users: User[] };

const TripUsersBoundary = ({ tripId, users }: TripUsersBoundaryProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <TripUsers tripId={tripId} users={users}/>
      </Suspense>
    </ErrorBoundary>
  );
};

export default TripUsersBoundary;