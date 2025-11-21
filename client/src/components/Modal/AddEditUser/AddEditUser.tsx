import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useUserEditor } from '../../../hooks/useUserEditor';
import { useUsers } from '../../../hooks/useUsers';
import ModalBase from '../Base/Base';
import { User } from '@shared/index';

type AddEditUserProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  currentUserData: {
    tripId: number;
    user: User | null;
  };
}

const AddEditUser = ({
  isOpen, onClose, currentUserData
}: AddEditUserProps) => {
  const { tripId, user } = currentUserData;
  const {
    save,
    remove,
    isSaving,
    isDeleting
  } = useUsers(tripId);

  const {
    form,
    setField
  } = useUserEditor({ tripId, user });

  const title = user ? 'Edit user' : 'Add new user';
  const userId = user?.id ? form.userId : null;


  const onDeleteClick = () => {
    if (!userId) return;
    remove(userId);
    onClose(false);
  }

  const handleSubmit = () => {
    const payload = {
      name: form.name.trim(),
      assigned: form.assigned,
    };

    if (user) {
      save({userId: user.id, tripId, ...payload });
    } else {
      save({...payload, tripId });
    }
    onClose(false);
  }

  return (
    <ModalBase isOpen={isOpen} onClose={() => onClose(false)} title={title}>
      <Box
        component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={(e) =>
        { e.preventDefault(); if (!e.currentTarget.reportValidity()) return; handleSubmit();}}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="assigned"
              checked={form.assigned}
              onChange={(_, checked) => setField('assigned', checked)}
            />
          }
          label="Assign to trip"
        />
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button variant="outlined" type="submit" disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save'}
          </Button>
          {userId ? (
            <Button
             type="button"
             onClick={onDeleteClick}
             disabled={isDeleting}
             sx={{ bgcolor: 'error.main', color: 'common.white', '&:hover': { bgcolor: 'error.dark' } }}
            >
              {isDeleting ? 'Deleting…' : 'Delete'}
            </Button>
          ) : null}
        </Box>
      </Box>
    </ModalBase>
  );
}

export default AddEditUser;