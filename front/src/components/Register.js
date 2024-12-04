import React, { useState } from "react";
import { Button, Box, Typography, TextField, Container, Alert, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputAdornment, Switch } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordMatch,
  validatePhoneNumber,
  validateRequiredFields,
  capitalizeFirstLetter
} from '../utils/validations.js';
import EmailIcon from '@mui/icons-material/Email';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [openVerification, setOpenVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'first_name' || name === 'last_name') {
      newValue = capitalizeFirstLetter(value);
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    // Validate all required fields
    const requiredError = validateRequiredFields(formData);
    if (requiredError) {
      setErrorMessage(requiredError);
      return;
    }

    // Validate individual fields
    const firstNameError = validateName(formData.first_name, 'First name');
    if (firstNameError) {
      setErrorMessage(firstNameError);
      return;
    }

    const lastNameError = validateName(formData.last_name, 'Last name');
    if (lastNameError) {
      setErrorMessage(lastNameError);
      return;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrorMessage(emailError);
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    const passwordMatchError = validatePasswordMatch(formData.password, formData.confirmPassword);
    if (passwordMatchError) {
      setErrorMessage(passwordMatchError);
      return;
    }

    const phoneError = validatePhoneNumber(formData.phone_number);
    if (phoneError) {
      setErrorMessage(phoneError);
      return;
    }

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };  

    const handleClickShowConfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

    try {
      const response = await axios.post('http://localhost:3000/sign-up', {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        password: formData.password
      });

      setVerificationCode('');
      
      if (response.status === 201) {
        setUserEmail(formData.email);
        setOpenVerification(true);
        setErrorMessage(null);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            setErrorMessage('User already exists');
            break;
          case 500:
            setErrorMessage('Server error, please try again later');
            break;
          default:
            setErrorMessage(error.response.data.message || 'Registration failed');
        }
      } else if (error.request) {
        setErrorMessage('No response from server. Please check your connection.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      console.error('Registration error:', error);
    }
  };

  const handleVerificationSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/sign-up/confirmation', {
        passcode: verificationCode
      });

      if (response.status === 201) {
        setOpenVerification(false);
        alert('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage(error.response.data.message || 'Invalid verification code');
            break;
          case 500:
            setErrorMessage('Server error, please try again later');
            break;
          default:
            setErrorMessage('Verification failed');
        }
      } else {
        setErrorMessage('An error occurred during verification');
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="login-container">
      <div className="background-image">
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: 3,
              borderRadius: 2,
            }}
          >
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
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                helperText="Required field, must start with a capital letter"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupAddIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                helperText="Required field, must start with a capital letter"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupAddIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                helperText="Required field (10 digits)"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddIcCallIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                helperText="Required field (minimum 8 characters)"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                helperText="Required field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

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
          </Box>
        </Container>
      </div>

      <Dialog 
        open={openVerification} 
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
    </div>
  );
};

export default Register;