import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useLogin } from '../../services/authService';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const login = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login.mutateAsync(formData);
      router.push('/dashboard');
    } catch (error) {
      setErrors({
        form: error.response?.data?.message || 'Login failed. Please try again.',
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="card shadow w-100" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sign in to your account</h2>
          <p className="text-center text-muted mb-4">
            Or{' '}
            <Link href="/register" className="text-primary">
              create a new account
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            {errors.form && (
              <div className="alert alert-danger" role="alert">
                {errors.form}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="visually-hidden">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email address"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="visually-hidden">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="form-check-input"
                />
                <label htmlFor="remember-me" className="form-check-label">
                  Remember me
                </label>
              </div>

              <Link href="/forgot-password" className="text-primary">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={login.isLoading}
              className="btn btn-primary w-100"
            >
              {login.isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;