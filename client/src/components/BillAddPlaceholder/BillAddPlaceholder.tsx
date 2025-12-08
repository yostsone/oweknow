import { IconButton, ListItem, ListItemText } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
type BillAddPlaceholderProps = {
  handleNewBillClick: ()=> void;
};

const BillAddPlaceholder = ({ handleNewBillClick }: BillAddPlaceholderProps) => {
  return (
    <>
      <ListItem
        sx={{ bgcolor: 'background.paper', cursor: 'pointer' }}
        onClick={handleNewBillClick}
      >
        <ListItemText>Add new bill</ListItemText>
        <IconButton
          aria-label="Add bill"
          size="large"
          color="primary"
        >
          <AddCircle />
        </IconButton>
      </ListItem>
    </>
  );
}
export default BillAddPlaceholder;