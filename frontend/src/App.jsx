import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Home from "./components/Home";
import Navbar from "./components/Navbar";


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LoginForm /> },
    { path: "/signup", element: <SignUpForm /> },
    { path: "/home", element: <Home /> },
    { path: "/navbar", element: <Navbar /> },
    
  ]);

  return (
    <RouterProvider router={router}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </RouterProvider>
  );
}

export default App;
