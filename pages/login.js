import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginComponents/LoginForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const { registered } = router.query;

  useEffect(() => {
    if (registered === 'true') {
      toast.success('Registration successful! Please log in.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  }, [registered]);

  return (
    <>
      <LoginForm />
      <ToastContainer />
    </>
  );
};

export default Login;