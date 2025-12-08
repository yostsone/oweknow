import React, { useCallback } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ModalBase from '../Base/Base';
import { Bill, User } from '@shared/index';
import { useBillForm } from '../../../hooks/bill/useBillForm';
import { useBillMutation } from '../../../hooks/bill/useBillMutation';

type AddEditBillProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  currentBillData: Bill | null,
  tripId: number,
  users: User[]
}

const AddEditBill = ({ isOpen, onClose, currentBillData, tripId, users }: AddEditBillProps) => {
  const {
    form,
    setField
  } = useBillForm({ bill: currentBillData, users: [] });

  const { save, isSaving, deleteBill } = useBillMutation();

  const handleSubmit = useCallback(() => {
    const payload = {
      title: form.title.trim(),
      total: form.total,
      payerId: form.payerId,
      tripId: tripId
    };

    if (currentBillData?.id != null) {
      save({ id: currentBillData.id, ...payload });
    } else {
      save({...payload});
    }
  }, [form.title, form.total, form.payerId, tripId, currentBillData?.id, save]);

  const handleDelete = useCallback(() => {
    if (!currentBillData?.id) return;
    deleteBill(currentBillData.id);
    onClose(false);
  }, [currentBillData?.id]);

  const handleTotalOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldValue = e.target.value;
        if (fieldValue === '') {
          setField('total', 0);
          return;
        }
        const num = Number(fieldValue);
        setField('total', Number.isNaN(num) ? 0 : num);
      }, [setField]
  );

  const handleOnBlur = useCallback(() => {
    if (typeof form.total === 'number') {
      setField('total', parseFloat(form.total.toFixed(2)));
    }
  }, [form.total, setField]);

  const title = currentBillData ? 'Edit Bill' : 'Add Bill';
  return (
    <ModalBase isOpen={isOpen} onClose={() => onClose(false)} title={title}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={(e) =>
        { e.preventDefault(); if (!e.currentTarget.reportValidity()) return; handleSubmit();}}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          required
          disabled={isSaving}
        />
        <TextField
          label="Total"
          name="total"
          value={form.total ?? ''}
          onChange={handleTotalOnChange}
          onBlur={handleOnBlur}
          type="number"
          required
          disabled={isSaving}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="payerId">Paid by</InputLabel>
          <Select
              labelId="payerId"
              id="payerId"
              value={form.payerId ?? ''}
              label="Paid by"
              required
              onChange={(e) => setField('payerId', e.target.value)}
          >
            { users.map((user) => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button variant="outlined" type="submit" disabled={isSaving}>
            save
          </Button>
          {currentBillData?.id ? (
            <Button
              type="button"
              onClick={handleDelete}
                // disabled={isDeleting}
              sx={{ bgcolor: 'error.main', color: 'common.white', '&:hover': { bgcolor: 'error.dark' } }}
            >
             Delete
            </Button>
          ) : null }
        </Box>
      </Box>
    </ModalBase>
  );
}

export default AddEditBill;