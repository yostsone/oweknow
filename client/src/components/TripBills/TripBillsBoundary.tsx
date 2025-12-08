import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { ErrorBoundary } from '../common/ErrorBoundary';
import TripBillsListContainer  from './TripBillsListContainer';
import { User } from '@shared/index';

const TripBillsBoundary = ( { tripId, users}: { tripId: number, users :User[] }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CircularProgress color="secondary"/>}>
        <TripBillsListContainer tripId={tripId} users={users}/>
      </Suspense>
    </ErrorBoundary>
  )
}

export default TripBillsBoundary;