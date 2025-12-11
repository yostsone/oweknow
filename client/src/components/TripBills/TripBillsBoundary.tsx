import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { ErrorBoundary } from '../common/ErrorBoundary';
import TripBillsListContainer  from './TripBillsListContainer';
import type { UserDB } from '@shared/index';

const TripBillsBoundary = ( { tripId, users}: { tripId: number, users :UserDB[] }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CircularProgress color="secondary"/>}>
        <TripBillsListContainer tripId={tripId} users={users}/>
      </Suspense>
    </ErrorBoundary>
  )
}

export default TripBillsBoundary;