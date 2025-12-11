import React, { lazy, useState, Suspense } from 'react';
import { useBills } from '../../hooks/bill/useBills';
import { Box, CircularProgress} from '@mui/material';
import type { UserDB } from '@shared/index';
import type { BillWithSplit } from '../../types/tripTypes';
import TripBillsListView from './TripBillsListView';
const ModalAddEditBill = lazy(() => import('../Modal/AddEditBill'));

const TripBillsListContainer = ({ tripId, users }: { tripId: number, users: UserDB[] }) => {
  const { data: billsList } = useBills(tripId);
  const [currentBill, setCurrentBill] = useState<BillWithSplit | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleBillClick = (bill: BillWithSplit) => {
    setCurrentBill(bill);
    setIsOpen(true);
  }

  const handleNewBillClick = () => {
    setCurrentBill(null);
    setIsOpen(true);
  }

  return (
    <Box component="section">
      <TripBillsListView
        billsList={billsList || []}
        handleBillClick={handleBillClick}
        handleNewBillClick={handleNewBillClick}
      />
        <Suspense
          fallback={
            <Box sx={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center' }}>
              <CircularProgress color="secondary" />
            </Box>
          }
        >
        { isOpen && <ModalAddEditBill
          currentBillData={currentBill}
          onClose={setIsOpen}
          isOpen={isOpen}
          users={users}
          tripId={tripId}
          />
        }
        </Suspense>
    </Box>
  )
}

export default TripBillsListContainer;