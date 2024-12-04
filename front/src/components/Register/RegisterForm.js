import React, { useState } from "react";
import { Button, Typography, TextField, Alert, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EmailIcon, GroupAddIcon, AddIcCallIcon, KeyIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { formFieldStyles } from './styles';

const RegisterForm = ({ formData, errorMessage, handleChange, handleRegister }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Register
      </Typography>
      
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleRegister} style={{ width: '100%' }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          helperText="Required field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        {/* ... other fields ... */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </form>
    </>
  );
};

export default RegisterForm; 