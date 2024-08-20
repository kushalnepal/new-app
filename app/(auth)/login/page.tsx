"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = (values: { email: string; password: string }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.email === values.email && storedUser.password === values.password) {
        router.push('/dashboard');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  name="email"
                />
                <ErrorMessage className="text-red-500 text-xs italic mt-1" name="email" component="div" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  name="password"
                />
                <ErrorMessage className="text-red-500 text-xs italic mt-1" name="password" component="div" />
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-8 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-4">Or Sign in with</h2>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Sign in with Google"
            >
              <FcGoogle className="text-4xl" />
            </button>
            <button
              onClick={() => handleSocialLogin('linkedin')}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Sign in with LinkedIn"
            >
              <FaLinkedin className="text-4xl" />
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Sign in with GitHub"
            >
              <FaGithub className="text-4xl" />
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
