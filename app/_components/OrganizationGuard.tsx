"use client";

import { useSelector } from "react-redux";
import { RootState } from "../_stores/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrganizationRegistrationForm from "./OrganizationRegistrationForm";

interface OrganizationGuardProps {
  children: React.ReactNode;
}

export default function OrganizationGuard({ children }: OrganizationGuardProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!token?.accessToken) {
      router.push('/login');
      return;
    }

    // Small delay to ensure auth state is fully loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [token, router]);

  console.log("OrganizationGuard - user:", user);

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <svg className="animate-spin h-8 w-8 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated but has no organization, show organization registration
  if (token?.accessToken && (!user?.organization || user.organization === null || !user.organization.id)) {
    return <OrganizationRegistrationForm />;
  }

  // If user is authenticated and has organization, show protected content
  return <>{children}</>;
}