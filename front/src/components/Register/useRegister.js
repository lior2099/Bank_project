import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useRegister = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegister = async (event) => {
    // ... your existing register logic ...
  };

  const handleVerificationSubmit = async () => {
    // ... your existing verification logic ...
  };

  return {
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
  };
}; 