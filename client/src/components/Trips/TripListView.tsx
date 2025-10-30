import React from 'react';
import {
  List, Stack, Typography, IconButton,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import type { Trip } from '@shared/index';
import { listWrapper } from './TripListStyles';
import { TripListItemRow } from './TripListItemRow';

type Props = {
  trips: Trip[];
  onCreate: () => void;
  onEdit: (trip: Trip) => void;
  onDelete: (tripId: number) => void;
  onPreloadModal?: () => void;
};

export function TripListView({
  trips, onCreate, onEdit, onDelete, onPreloadModal
}: Props) {
  return (
    <>
      <Stack
        component="header"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 2, mb: 2 }}
      >
        <Typography variant="h4" component="h1">Trips</Typography>
        <IconButton
          aria-label="Add trip"
          size="large"
          color="primary"
          onClick={onCreate}
          onMouseEnter={onPreloadModal}
        >
          <AddCircle />
        </IconButton>
      </Stack>

      {trips.length === 0 ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <Typography sx={{ mb: 2 }}>No trips yet.</Typography>
        </Stack>
      ) : (
        <List sx={listWrapper}>
          {trips.map((trip, idx) => (
            <React.Fragment key={trip.id}>
              <TripListItemRow
                trip={trip}
                linkTo={`/trip/${trip.id}`}
                onEdit={onEdit}
                onDelete={onDelete}
                onPreloadModal={onPreloadModal}
              />
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
}