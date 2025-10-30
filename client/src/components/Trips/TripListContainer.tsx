import React, { lazy, Suspense, useCallback, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import type { Trip } from '@shared/index';
import { useTrip } from '../../hooks/useTrip';
import { TripListView } from './TripListView';

const ModalAddEditTrip = lazy(() => import('../Modal/AddEditTrip'));
const preloadModal = () => { void import('../Modal/AddEditTrip'); };

export function TripListContainer() {
  const { data: tripsRaw, remove, isLoading, isError } = useTrip(); // adjust to your hook
  const trips: Trip[] = tripsRaw ?? [];

  const [isOpen, setIsOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  const openCreate = useCallback(() => {
    setCurrentTrip(null);
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((trip: Trip) => {
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