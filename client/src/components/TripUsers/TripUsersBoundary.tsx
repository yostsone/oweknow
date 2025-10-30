import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { ErrorBoundary } from '../common/ErrorBoundary';
import TripUsers from './TripUsers';

type TripUsersProps = { tripId: string };

export const TripUsersBoundary = ({ tripId }: TripUsersProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <TripUsers tripId={tripId}/>
      </Suspense>
    </ErrorBoundary>
  );
};