import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Resources from "./Components/Resources";
import Feedback from "./Components/Feedback";
import Contacts from "./Components/Contacts";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LoginForm /> },
    { path: "/signup", element: <SignUpForm /> },
    { path: "/home", element: <Home /> },
    { path: "/navbar", element: <Navbar /> },
    { path: "/resources", element: <Resources /> },
    { path: "/feedback", element: <Feedback /> },
    { path: "/contacts", element: <Contacts /> },
  ]);

  return (
    <RouterProvider router={router}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </RouterProvider>
  );
}

export default App;
