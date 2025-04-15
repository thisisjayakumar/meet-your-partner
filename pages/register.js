import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  return (
    <>
      <RegisterForm />
      <ToastContainer />
    </>
  );
};

export default Register;