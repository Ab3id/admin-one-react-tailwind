import React from "react";
import { getPageTitle } from "../_lib/config";
import { Metadata } from "next";
import RegisterForm from "./_components/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: getPageTitle("Register"),
};

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      {/* Back to Home Link */}
      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Link>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 min-h-[700px]">
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 flex items-center justify-center p-12">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Join MojaSMS</h1>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Start building the future of communication today
                </p>
                <div className="flex justify-center items-center gap-8 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Free to start
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                    No setup fees
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-12">
              <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Create account</h2>
                  <p className="text-gray-400">Get started with MojaSMS</p>
                </div>
                
                <RegisterForm />
                
                <div className="text-center text-sm text-gray-400 mt-6">
                  Already have an account?{' '}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                    Sign in here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
