import React from "react";
import { Container, Box } from '@mui/material';
import RegisterForm from './RegisterForm';
import VerificationDialog from './VerificationDialog';
import { useRegister } from './useRegister'; // We'll create this custom hook
import { mainContainerStyle } from './styles';

const Register = () => {
  const {
    formData,
    errorMessage,
    openVerification,
    userEmail,
    verificationCode,
    handleChange,
    handleRegister,
    handleVerificationSubmit,
    setOpenVerification,
    setErrorMessage,
    setVerificationCode
  } = useRegister();

  return (
    <div className="login-container">
      <div className="background-image">
        <Container maxWidth="xs">
          <Box sx={mainContainerStyle}>
            <RegisterForm
              formData={formData}
              errorMessage={errorMessage}
              handleChange={handleChange}
              handleRegister={handleRegister}
            />
          </Box>
        </Container>
      </div>

      <VerificationDialog
        open={openVerification}
        userEmail={userEmail}
        verificationCode={verificationCode}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setVerificationCode={setVerificationCode}
        setOpenVerification={setOpenVerification}
        handleVerificationSubmit={handleVerificationSubmit}
      />
    </div>
  );
};

export default Register; 