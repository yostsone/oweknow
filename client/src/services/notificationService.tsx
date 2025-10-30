import React, { useEffect, useCallback, useMemo, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

type Toast = {
  id: number;
  message: string;
  variant: AlertColor; // 'success' | 'info' | 'warning' | 'error'
};

type Notify = {
  success: (message: string, opts?: Omit<Toast, 'id' | 'variant' | 'message'>) => void;
  error:   (message: string, opts?: Omit<Toast, 'id' | 'variant' | 'message'>) => void;
  info:    (message: string, opts?: Omit<Toast, 'id' | 'variant' | 'message'>) => void;
  warning: (message: string, opts?: Omit<Toast, 'id' | 'variant' | 'message'>) => void;
};

const NotificationContext = React.createContext<Notify | null>(null);
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<Toast[]>([]);
  const [current, setCurrent] = useState<Toast | null>(null);
  const [open, setOpen] = useState(false);
  const defaultDuration = 2000;

  useEffect(() => {
    if (!current && queue.length > 0) {
      console.log('process next')
      const next = queue[0];
      setQueue(q => q.slice(1));
      setCurrent(next);
      setOpen(true);
    }
  }, [queue, current]);

  const push = useCallback((variant: AlertColor, message: string, opts?: Omit<Toast, 'id' | 'variant' | 'message'>) => {
    setQueue(q => [...q, { id: Date.now() + Math.random(), message, variant, ...opts }]);
  }, []);

  const notify = useMemo<Notify>(() => ({
    success: (m, o) => push('success', m, o),
    error:   (m, o) => push('error', m, o),
    info:    (m, o) => push('info', m, o),
    warning: (m, o) => push('warning', m, o),
  }), [push]);

  const prevNotifyRef = React.useRef<Notify | null>(null);
  React.useEffect(() => {
    if (prevNotifyRef.current !== notify) {
      console.log('notify identity changed?', prevNotifyRef.current ? 'YES' : 'initial');
      prevNotifyRef.current = notify;
    } else {
      console.log('notify identity unchanged');
    }
  });

  const handleClose = (_?: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleExited = () => {
    // Clear current only after the exit transition finishes
    setCurrent(null);
  };

  return (
      <NotificationContext.Provider value={notify}>
        {children}
        <Snackbar
            open={open}
            autoHideDuration={defaultDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionProps={{ onExited: handleExited }}
        >
          <Alert onClose={handleClose} severity={current?.variant ?? 'info'} variant="filled" sx={{ width: '100%' }}>
            {current?.message}
          </Alert>
        </Snackbar>
      </NotificationContext.Provider>
  );
}

export function useNotify(): Notify {
  const ctx = React.useContext(NotificationContext);
  if (!ctx) throw new Error('useNotify must be used within <NotificationProvider>');
  return ctx;
}