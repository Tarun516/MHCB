import React from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <LoginForm /> },
    { path: '/signup', element: <SignUpForm /> }
  ]);

  return (
    <RouterProvider router={router}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </RouterProvider>
  );
}

export default App;
