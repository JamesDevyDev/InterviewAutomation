'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useApplicantStore from '@/zustand/useApplicantStore';
import useCompanyStore from '@/zustand/useCompanyStore';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { registerFunction, loginFunction, getLoggedInUser } = useApplicantStore();
  const { getLoggedInCompany } = useCompanyStore();

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getLoggedInUser();
      const company = await getLoggedInCompany();

      if (user || company) {
        router.replace('/main');
      }
    };
    checkAuth();
  }, [getLoggedInUser, getLoggedInCompany, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        if (!agreedToTerms) {
          setError('You must agree to the terms to register.');
          return;
        }

        const res = await registerFunction(username, password);
        if (res?.error) {
          setError(res.error);
          return;
        }

        const loginRes = await loginFunction(username, password);
        if (loginRes?.error) {
          setError(loginRes.error);
          return;
        }

        router.push('/main');
      } else {
        const res = await loginFunction(username, password);
        if (res?.error) {
          setError(res.error);
        } else {
          router.push('/main');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {isRegister ? 'Create (Applicant)' : '(Applicant) Welcome Back'}
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          {isRegister
            ? 'Start your journey with us.'
            : 'Login your Applicant to continue to your dashboard.'}
        </p>

        <form className="flex flex-col space-y-4 text-black" onSubmit={handleSubmit}>
          <input
            placeholder="Applicant name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />

          {isRegister && (
            <div className="flex items-center text-sm text-gray-700 space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="w-4 h-4"
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:underline"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isRegister && !agreedToTerms}
            className={`bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition ${
              isRegister && !agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isRegister ? 'Register' : 'Log In'}
          </button>

          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-purple-500 font-semibold hover:underline transition cursor-pointer"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
              setAgreedToTerms(false);
            }}
          >
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
