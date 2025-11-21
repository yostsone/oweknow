import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Stack, IconButton, Typography,
} from '@mui/material';
import { EditNote, Delete as DeleteIcon } from '@mui/icons-material';
import type { Trip } from '@shared/index';
import { listItem } from './TripListStyles';

type TripListItemRowProps = {
  trip: Trip;
  linkTo: string;
  onEdit: (trip: Trip) => void;
  onDelete: (id: number) => void;
  onPreloadModal?: () => void;
};

const TripListItemRow= ({ trip, linkTo, onEdit, onDelete, onPreloadModal }: TripListItemRowProps) => {
  const handleEdit = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onPreloadModal?.();
    onEdit(trip);
  }, [trip, onPreloadModal]);

  const handleDelete = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(trip.id);
  }, [trip.id]);

  return (
    <ListItem
      alignItems="flex-start"
      disablePadding
      secondaryAction={
        <Stack direction="row" spacing={0.5} alignItems="center">
          <IconButton aria-label={`Edit ${trip.name}`} size="small" edge="end" onClick={handleEdit}>
            <EditNote fontSize="small" />
          </IconButton>
          <IconButton aria-label={`Delete ${trip.name}`} size="small" edge="end" onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      }
    >
      <ListItemButton component={Link} to={linkTo} sx={listItem}>
        <ListItemAvatar>
          <Avatar alt={trip.name} src="/static/images/avatar/1.jpg">
            {trip.name?.[0]?.toUpperCase() ?? '?'}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
         primary={trip.name}
         secondary={
          <Typography component="span" variant="body2" sx={{ color: 'text.primary', display: 'inline' }}>
            {trip.location} {trip.year}
          </Typography>
        }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default memo<TripListItemRowProps>(TripListItemRow);