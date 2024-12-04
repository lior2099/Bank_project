import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

const VerificationDialog = ({
  open,
  userEmail,
  verificationCode,
  errorMessage,
  setErrorMessage,
  setVerificationCode,
  setOpenVerification,
  handleVerificationSubmit
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={() => {}}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
      disableBackdropClick
    >
      <DialogTitle>
        Email Verification
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Please enter the 6-digit verification code sent to {userEmail}
        </Typography>
        <TextField
          label="Verification Code"
          variant="outlined"
          fullWidth
          value={verificationCode}
          onChange={(e) => {
            if (errorMessage) {
              setErrorMessage(null);
            }
            
            const value = e.target.value.replace(/[^\d]/g, '');
            if (value.length <= 6) {
              setVerificationCode(value);
            }
          }}
          placeholder="Enter 6-digit code"
          inputProps={{
            maxLength: 6,
            pattern: '[0-9]*'
          }}
          error={!!errorMessage}
          helperText={errorMessage}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={() => {
            setOpenVerification(false);
            setErrorMessage(null);
            setVerificationCode('');
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleVerificationSubmit}
          color="primary"
          variant="contained"
          disabled={verificationCode.length !== 6}
        >
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerificationDialog; 