import { List, ListItem, ListItemText} from '@mui/material';
import { Bill } from '@shared/index';
import BillAddPlaceholder from '../BillAddPlaceholder/BillAddPlaceholder';
const preloadModal = () => { void import('../Modal/AddEditBill'); };

type TripBillsListViewProps = {
  billsList: Bill[];
  handleBillClick: (bill: Bill) => void;
  handleNewBillClick: () => void;
}
const TripBillsListView = ({
  billsList, handleBillClick, handleNewBillClick }: TripBillsListViewProps
) => {
  const length = billsList ? billsList.length : 0;

  if (!length) {
    return <p>No bills available for this trip.</p>;
  }

  return (
    <List
      component="ul"
      sx={{ width: '100%', display: 'flex', gap:2, flexDirection: 'column' }}
    >
      <BillAddPlaceholder key={'AddBillPlaceholder'} handleNewBillClick={handleNewBillClick}/>
      { billsList.map((bill, index) => {
        return (
          <ListItem
            sx={{ bgcolor: 'background.paper', cursor: 'pointer' }}
            component="li"
            key={bill.id}
            onClick={() => handleBillClick(bill)}
            onMouseOver={preloadModal}
          >
            <ListItemText>{ bill.title}</ListItemText>
            <ListItemText sx={{  textAlign: 'right' }}>€{ bill.total }</ListItemText>
          </ListItem>
        );
      })}
    </List>
  )
}

export default TripBillsListView;