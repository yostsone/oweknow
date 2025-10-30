export type NotificationVariant = 'success' | 'error' | 'info' | 'warning';

export type NotificationOptions = {
  autoHideDuration?: number;
};

export type NotificationEvent = {
  id: number;
  message: string;
  variant: NotificationVariant;
  autoHideDuration?: number;
};

export type Notify = {
  success: (message: string, opts?: NotificationOptions) => void;
  error: (message: string, opts?: NotificationOptions) => void;
  info: (message: string, opts?: NotificationOptions) => void;
  warning: (message: string, opts?: NotificationOptions) => void;
};