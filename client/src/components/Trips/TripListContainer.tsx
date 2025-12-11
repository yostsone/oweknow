import React, { lazy, Suspense, useCallback, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import type { TripDB } from '@shared/index';
import { useTripMutation } from '../../hooks/trip/useTripMutation';
import { TripListView } from './TripListView';
import { useTripsQuery } from '../../hooks/trip/useTripsQuery';

const ModalAddEditTrip = lazy(() => import('../Modal/AddEditTrip'));
const preloadModal = () => { void import('../Modal/AddEditTrip'); };

export function TripListContainer() {
  const { data: trips } = useTripsQuery();
  const { remove } = useTripMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<TripDB | null>(null);

  const openCreate = useCallback(() => {
    setCurrentTrip(null);
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((trip: TripDB) => {
    setCurrentTrip(trip);
    setIsOpen(true);
  }, []);

  const handleDelete = useCallback((tripId: number) => {
    if (window.confirm('Delete this trip?')) remove(tripId);
  }, [remove]);

  return (
    <Box component="section">
      <TripListView
        trips={trips}
        onCreate={openCreate}
        onEdit={openEdit}
        onDelete={handleDelete}
        onPreloadModal={preloadModal}
      />

      <Suspense
        fallback={
          <Box sx={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center' }}>
            <CircularProgress color="secondary" />
          </Box>
        }
      >
        {isOpen && (
          <ModalAddEditTrip
            isOpen={isOpen}
            onClose={setIsOpen}
            currentTripData={currentTrip}
          />
        )}
      </Suspense>
    </Box>
  );
}

export default TripListContainer;