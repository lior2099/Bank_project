import React from "react";
import { Box, Typography, Container, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import "./Home.css";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="background-image">
        <Container maxWidth="xs">
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              404 Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              The requested URL <strong>{location.pathname}</strong> was not found on this server. That's all we know.
            </Typography>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default NotFound; 