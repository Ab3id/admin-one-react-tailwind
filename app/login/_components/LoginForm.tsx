"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosClient from "../../_lib/axiosClient";
import { setCredentials } from "../../_stores/authSlice";
import { useDispatch } from "react-redux";
//import FormCheckRadio from "../../_components/FormField/CheckRadio";

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>("")

  const handleSubmit = async (formValues: LoginForm) => {
    setFormError('')
    setIsLoading(true)
    const res = await axiosClient.post('/auth/login', {
      email: formValues.email,
      password: formValues.password,
    }).catch((error)=>{
      setFormError(error?.response?.data?.message)
    }).finally(()=>{
      setIsLoading(false)
    })


    if(res?.status == 200){

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
    }else{
      console.log('LoginForm - error:', res);

      //add error from response to formError state
      // setFormError(res?.data?.message);
    
    }

    
   
  };

  const initialValues: LoginForm = {
    email: "",
    password: "",
    remember: false,
  };
  const emailValidation = value => {
    if (!value) return 'Email cannot be empty';
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = 'Invalid email address';
    }
    return errorMessage;
  };

  const validatePassword = value => {
    if (!value) return 'Password cannot be empty';
  };

  return (
    <div className="w-full">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {
          ({errors, touched}) => (
            <Form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <Field 
                validate={emailValidation} 
                name="email" 
                type="email" 
                id="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="Enter your email"
              />
              {errors.email && touched.email ? <div className="text-xs text-red-400 mt-2">{errors.email}</div> : null}
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="Enter your password"
              />
              {errors.password && touched.password ? <div className="text-xs text-red-400 mt-2">{errors.password}</div> : null}
            </div>
    
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-3 px-4 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>

            {formError.length > 0 ? <div className="text-sm text-red-400 mt-4 text-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">{formError}</div> : null}
          </Form>
          )
        }
    </Formik>
    </div>
  );
}


