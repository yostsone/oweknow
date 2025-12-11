import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useUserForm } from '../../../hooks/user/useUserForm';
import { useUsersMutation } from '../../../hooks/user/useUserMutation';
import ModalBase from '../Base/Base';
import type  { User } from '@app-types/userTypes';

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
  } = useUsersMutation(tripId);

  const {
    form,
    setField
  } = useUserForm({ tripId, user });

  const title = user ? 'Edit user' : 'Add new user';
  const userId = user?.id ? form.id : null;


  const onDeleteClick = () => {
    if (!userId) return;
    remove(userId);
    onClose(false);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;

    const payload = {
      name: form.name.trim(),
      assigned: form.assigned,
    };

    if (user) {
      save({id: user.id, tripId, ...payload });
    } else {
      save({...payload, tripId });
    }
    onClose(false);
  }

  return (
    <ModalBase isOpen={isOpen} onClose={() => onClose(false)} title={title}>
      <Box
        component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
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