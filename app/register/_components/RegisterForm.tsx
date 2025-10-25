"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosClient from "../../_lib/axiosClient";
import { setCredentials } from "../../_stores/authSlice";
import { useDispatch } from "react-redux";

type RegisterForm = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = async (formValues: RegisterForm) => {
    setFormError('');
    setIsLoading(true);
    
    const res = await axiosClient.post('/auth/register', {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.email,
      phone: formValues.phone,
      password: formValues.password,
    }).catch((error) => {
      console.log('Error ', error);
      setFormError(error?.response?.data?.message);
    }).finally(() => {
      setIsLoading(false);
    });

    console.log('Response', res);

    if (res?.status === 200 || res?.status === 201) {
      localStorage.setItem('auth', JSON.stringify(res.data));

      dispatch(setCredentials({
        token: {
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token
        },
        user: res.data.user,
      }));
      
      // Check if user has organization, if not they'll be redirected by OrganizationGuard
      router.push("/dashboard");
    }

    console.log("Form values", formValues);
  };

  const initialValues: RegisterForm = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const validateFirstName = (value: string) => {
    if (!value) return 'First name cannot be empty';
    if (value.length < 2) return 'First name must be at least 2 characters';
  };

  const validateLastName = (value: string) => {
    if (!value) return 'Last name cannot be empty';
    if (value.length < 2) return 'Last name must be at least 2 characters';
  };

  const emailValidation = (value: string) => {
    if (!value) return 'Email cannot be empty';
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = 'Invalid email address';
    }
    return errorMessage;
  };

  const validatePhone = (value: string) => {
    if (!value) return 'Phone number is required';
    // Remove spaces and check for Tanzanian format
    const cleanPhone = value.replace(/\s/g, '');
    // Tanzanian format: +255 followed by 9 digits or 0 followed by 9 digits
    if (!/^(\+255[67]\d{8}|0[67]\d{8})$/.test(cleanPhone)) {
      return 'Please enter a valid Tanzanian phone number (+255 754 123 456 or 0754 123 456)';
    }
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password cannot be empty';
    if (value.length < 6) return 'Password must be at least 6 characters';
  };

  const validateConfirmPassword = (value: string, values: RegisterForm) => {
    if (!value) return 'Please confirm your password';
    if (value !== values.password) return 'Passwords do not match';
  };

  return (
    <div className="w-full">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, touched, values }) => (
          <Form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-300 mb-2">
                  First name
                </label>
                <Field
                  validate={validateFirstName}
                  name="firstname"
                  type="text"
                  id="firstname"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  placeholder="First name"
                />
                {errors.firstname && touched.firstname ? (
                  <div className="text-xs text-red-400 mt-2">{errors.firstname}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-300 mb-2">
                  Last name
                </label>
                <Field
                  validate={validateLastName}
                  name="lastname"
                  type="text"
                  id="lastname"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  placeholder="Last name"
                />
                {errors.lastname && touched.lastname ? (
                  <div className="text-xs text-red-400 mt-2">{errors.lastname}</div>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <Field
                validate={emailValidation}
                name="email"
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                placeholder="Enter your email"
              />
              {errors.email && touched.email ? (
                <div className="text-xs text-red-400 mt-2">{errors.email}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <Field
                validate={validatePhone}
                name="phone"
                type="tel"
                id="phone"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                placeholder="+255 754 123 456"
              />
              {errors.phone && touched.phone ? (
                <div className="text-xs text-red-400 mt-2">{errors.phone}</div>
              ) : null}
              <p className="text-xs text-gray-500 mt-1">
                Enter your Tanzanian mobile number (Vodacom, Airtel, Tigo, or Halotel)
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <Field
                validate={validatePassword}
                name="password"
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                placeholder="Create a password"
              />
              {errors.password && touched.password ? (
                <div className="text-xs text-red-400 mt-2">{errors.password}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm password
              </label>
              <Field
                validate={(value: string) => validateConfirmPassword(value, values)}
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="text-xs text-red-400 mt-2">{errors.confirmPassword}</div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-3 px-4 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>

            {formError.length > 0 ? (
              <div className="text-sm text-red-400 mt-4 text-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                {formError}
              </div>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
}