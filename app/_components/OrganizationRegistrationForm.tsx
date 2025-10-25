"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosClient from "../_lib/axiosClient";
import { updateOrganization } from "../_stores/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_stores/store";

type OrganizationForm = {
  name: string;
  email: string;
  address: string;
  tin?: string;
  vrn?: string;
};

export default function OrganizationRegistrationForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = async (formValues: OrganizationForm) => {
    setFormError('');
    setIsLoading(true);
    
    const res = await axiosClient.post('/org/register', {
      name: formValues.name,
      email: formValues.email,
      address: formValues.address,
      tin: formValues.tin || null,
      vrn: formValues.vrn || null,
    }).catch((error) => {
      console.log('Error ', error);
      setFormError(error?.response?.data?.message || 'Failed to register organization');
    }).finally(() => {
      setIsLoading(false);
    });

    if (res?.status === 200 || res?.status === 201 || res?.status === 202) {
      // Update user with organization data
      console.log('Organization registered:', res.data.organization);
      
      try {
        dispatch(updateOrganization({
          organization: res.data.organization
        }));

        // Update localStorage with new organization data
        const currentAuth = JSON.parse(localStorage.getItem('auth') || '{}');
        if (currentAuth && currentAuth.user) {
          const updatedAuth = {
            ...currentAuth,
            user: {
              ...currentAuth.user,
              organization: res.data.organization
            }
          };
          localStorage.setItem('auth', JSON.stringify(updatedAuth));
        }
        
        router.push("/dashboard");
      } catch (error) {
        console.error('Error updating organization in state:', error);
        setFormError('Failed to update organization. Please try again.');
      }
    }
  };

  const initialValues: OrganizationForm = {
    name: "",
    email: user?.email || "",
    address: "",
    tin: "",
    vrn: "",
  };

  const validateName = (value: string) => {
    if (!value) return 'Organization name is required';
    if (value.length < 2) return 'Organization name must be at least 2 characters';
  };

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return 'Invalid email address';
    }
  };

  const validateAddress = (value: string) => {
    if (!value) return 'Address is required';
    if (value.length < 10) return 'Please provide a complete address';
  };

  const validateTIN = (value: string) => {
    if (value && value.length !== 9) return 'TIN must be 9 digits';
  };

  const validateVRN = (value: string) => {
    if (value && value.length !== 8) return 'VRN must be 8 digits';
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-2 5h2M7 16h6" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Register Your Organization</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Complete your profile to start sending SMS across Tanzania
            </p>

          </div>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form className="space-y-6">
                {/* Organization Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Organization Name <span className="text-red-400">*</span>
                  </label>
                  <Field
                    validate={validateName}
                    name="name"
                    id="name"
                    placeholder="Enter your business/organization name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  {errors.name && touched.name && (
                    <div className="text-xs text-red-400 mt-2">{errors.name}</div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Business Email <span className="text-red-400">*</span>
                  </label>
                  <Field
                    validate={validateEmail}
                    name="email"
                    type="email"
                    id="email"
                    placeholder="business@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  {errors.email && touched.email && (
                    <div className="text-xs text-red-400 mt-2">{errors.email}</div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                    Business Address <span className="text-red-400">*</span>
                  </label>
                  <Field
                    validate={validateAddress}
                    name="address"
                    as="textarea"
                    rows="3"
                    id="address"
                    placeholder="Enter complete business address in Tanzania"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                  />
                  {errors.address && touched.address && (
                    <div className="text-xs text-red-400 mt-2">{errors.address}</div>
                  )}
                </div>

                {/* Optional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* TIN */}
                  <div>
                    <label htmlFor="tin" className="block text-sm font-medium text-gray-300 mb-2">
                      TIN (Tax Identification Number)
                      <span className="text-gray-500 ml-1">Optional</span>
                    </label>
                    <Field
                      validate={validateTIN}
                      name="tin"
                      id="tin"
                      placeholder="123456789"
                      maxLength="9"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                    {errors.tin && touched.tin && (
                      <div className="text-xs text-red-400 mt-2">{errors.tin}</div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">9-digit TIN number if registered</p>
                  </div>

                  {/* VRN */}
                  <div>
                    <label htmlFor="vrn" className="block text-sm font-medium text-gray-300 mb-2">
                      VRN (VAT Registration Number)
                      <span className="text-gray-500 ml-1">Optional</span>
                    </label>
                    <Field
                      validate={validateVRN}
                      name="vrn"
                      id="vrn"
                      placeholder="12345678"
                      maxLength="8"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                    {errors.vrn && touched.vrn && (
                      <div className="text-xs text-red-400 mt-2">{errors.vrn}</div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">8-digit VRN number if VAT registered</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black py-4 px-6 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering Organization...
                    </div>
                  ) : (
                    'Complete Registration & Continue to Dashboard'
                  )}
                </button>

                {formError && (
                  <div className="text-sm text-red-400 mt-4 text-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    {formError}
                  </div>
                )}

                {/* Info */}
                <div className="text-center text-sm text-gray-500 mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                  <p className="mb-2">🛡️ Your information is secure and used only for account verification</p>
                  <p>📍 We support businesses across all regions of Tanzania</p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}