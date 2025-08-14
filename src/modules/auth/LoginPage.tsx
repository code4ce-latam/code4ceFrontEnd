'use client';

import LoginForm from '@/components/Login-form';
import { TypewriterText } from '@/components/typewriter-text';
import { useAuth } from '@/components/lib/auth-context';
// import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Building2 } from 'lucide-react';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     router.push('/dashboard');
  //   }
  // }, [user, isLoading, router]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
  //       <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
  //     </div>
  //   );
  // }

  // if (user) {
  //   return null; // Will redirect to dashboard
  // }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900 p-28">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-blue-600 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-600 rounded-full blur-md"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-gray-900 dark:text-white">
          <div className="mb-8">
            <h1 className="text-5xl font-black mb-6 leading-tight">Bienvenido a tu Business Hub</h1>
            <div className="text-xl text-gray-600 dark:text-gray-300 mb-8 h-8">
              <TypewriterText text="Unlock your potential with our management tools." speed={50} className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Code4ce Hub</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Management Platform</p>
              </div>
            </div>
          </div>

          <LoginForm />

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2025 Code4ce. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
