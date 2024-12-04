// Home.js
import React, { useState } from "react";
import { Button, Box, Typography, Container, Dialog, DialogContent } from '@mui/material';
import LoginForm from './LoginForm.js';
import "./Home.css";

const Home = () => {
  // State to control the login dialog
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  // Function to open the login dialog
  const handleOpenLogin = () => {
    setOpenLoginDialog(true);
  };

  // Function to close the login dialog
  const handleCloseLogin = () => {
    setOpenLoginDialog(false);
  };

  return (
    <div className="login-container">
      <div className="background-image">
        <Box sx={{ position: 'absolute', top: 0, right: 20 }}>
          <Button
            className="signup-button"
            variant="contained"
            href="/register"
            sx={{
              backgroundColor: '#1976d2', // Default color
              '&:hover': {
                backgroundColor: '#2e7d32', // Green color on hover
              }
            }}
          >
            Sign Up
          </Button>
        </Box>
        <Container maxWidth="xs">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 4,
              mt: 4
            }}
          >
            Welcome to MO Bank
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 4
            }}
          >
            Swift, Secure, and Dedicated to Your Financial Well-being.
          </Typography>
          
          {/* Button to open login popup */}
          <Button
            variant="contained"
            onClick={handleOpenLogin}
            fullWidth
          >
            Log In
          </Button>

          {/* Login Dialog */}
          <Dialog
            open={openLoginDialog}
            onClose={handleCloseLogin}
            maxWidth="xs"
            fullWidth
          >
            <DialogContent>
              <LoginForm onClose={handleCloseLogin} />
            </DialogContent>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default Home;