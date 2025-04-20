import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Alert severity="success" onClose={onClose}>
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default SuccessMessage; 