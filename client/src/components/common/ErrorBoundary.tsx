import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

type Props = { children: React.ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State { return { error }; }
  render() {
    if (this.state.error) {
      return (
          <Alert severity="error" sx={{mt:5}}>
            <AlertTitle>Failed to load</AlertTitle>
            {this.state.error.message}
          </Alert>
      );
    }
    return this.props.children;
  }
}