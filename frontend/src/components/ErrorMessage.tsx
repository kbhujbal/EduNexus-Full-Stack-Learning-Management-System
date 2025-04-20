import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
        {onRetry && (
          <Box sx={{ mt: 1 }}>
            <button
              onClick={onRetry}
              style={{
                background: 'none',
                border: 'none',
                color: '#d32f2f',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Try again
            </button>
          </Box>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorMessage; 