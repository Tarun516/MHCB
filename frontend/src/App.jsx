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
import Resources from "./components/Resources";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LoginForm /> },
    { path: "/signup", element: <SignUpForm /> },
    { path: "/home", element: <Home /> },
    { path: "/navbar", element: <Navbar /> },
    { path: "/resources", element: <Resources /> },
  ]);

  return (
    <RouterProvider router={router}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </RouterProvider>
  );
}

export default App;
