import React, { useCallback } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useTripForm } from '../../../hooks/useTripForm';
import { useTrip } from '../../../hooks/useTrip';
import ModalBase from '../Base/Base';
import { Trip } from '@shared/index';

type AddEditTripProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  currentTripData: Trip | null
}

const AddEditTrip = ({ isOpen, onClose, currentTripData }: AddEditTripProps) => {
  const {
    form,
    setField,
    reset
  } = useTripForm({ trip: currentTripData });

  const { save, isSaving } = useTrip()

  const handleSubmit = useCallback(() => {
    const payload = {
      name: form.name.trim(),
      location: form.location.trim(),
      year: form.year ?? null,
    };

    if (currentTripData?.id != null) {
      save({ id: currentTripData.id, ...payload }, { onSuccess: reset });
    } else {
      save({ ...payload }, { onSuccess: reset });
    }
  }, [save, form.name, form.location, form.year, currentTripData?.id]);

  const handleYearOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const fieldValue = e.target.value;
      if (fieldValue === '') {
        setField('year', null);
        return;
      }
      const num = Number(fieldValue);
      setField('year', Number.isNaN(num) ? null : num);
    }, [setField]
  );

  return (
    <ModalBase isOpen={isOpen} onClose={() => onClose(false)} title="Trip modal">
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={(e) =>
        { e.preventDefault(); if (!e.currentTarget.reportValidity()) return; handleSubmit();}}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          required
          disabled={isSaving}
        />
        <TextField
            label="Year"
            name="year"
            type="number"
            inputProps={{ min: 1900, max: 2100, step: 1, inputMode: 'numeric' }}
            value={form.year?? ''}
            onChange={handleYearOnChange}
            required
            disabled={isSaving}
        />
        <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={(e) => setField('location', e.target.value)}
            required
            disabled={isSaving}
        />
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button variant="outlined" type="submit" disabled={isSaving}>
            save
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
}

export default AddEditTrip;