import React from "react";
import { Link } from 'react-router-dom';

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create an account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit} autoComplete="off">
          {!isLogin && (
            <div>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="first-name-input" className="sr-only">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="first-name-input"
                    value={user.firstName}
                    onChange={onChange}
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last-name-input" className="sr-only">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="last-name-input"
                    value={user.lastName}
                    onChange={onChange}
                    name="lastName"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-input" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="email-input"
                value={user.email}
                onChange={onChange}
                name="email"
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <label htmlFor="password-input" className="sr-only">
                Password
              </label>
              <input
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="password-input"
                value={user.password}
                onChange={onChange}
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onSubmit={onSubmit}
            >
              {isLogin ? 'Sign In' : 'Register'}
            </button>
          </div>
          {isLogin && (
            <div className="mt-2 text-center">
                <p className="text-sm">
                Don’t have an account?
                <Link to="/auth/register" className="ml-2 text-indigo-600 hover:text-indigo-500">
                    Register
                </Link>
                </p>
            </div>
          )}
          {!isLogin && (
            <div className="mt-2 text-center">
                <p className="text-sm">
                Already have an account?
                <Link to="/auth/login" className="ml-2 text-indigo-600 hover:text-indigo-500">
                    Login
                </Link>
                </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
