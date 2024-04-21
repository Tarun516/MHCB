import React, { useState, useRef } from "react";
import axios from "axios";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    smoke: "",
    mobile: "",
    gender: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    confirmPassword: "",
  });
  // Hook to access the history object
  const confirmPasswordRef = useRef(null); // Ref for the confirm password input element

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Check if the password and confirm password fields match
    if (name === "password" || name === "confirmPassword") {
      const password = formData.password;
      const confirmPassword = formData.confirmPassword;
      if (password !== confirmPassword) {
        setFormErrors({
          ...formErrors,
          confirmPassword: "Passwords do not match",
        });
      } else {
        setFormErrors({ ...formErrors, confirmPassword: "" });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      confirmPasswordRef.current.focus(); // Set focus on the confirm password field
      return;
    }

    try {
      // Make API request to your backend server to save the user data
      const response = await axios.post("/register", formData);
      console.log("Response:", response.data);

      // Redirect to login page upon successful signup
      window.location.href = "/login";
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenario here (e.g., display error message to the user)
    }
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Signup
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onSubmit={handleSubmit}>
          <div class="flex flex-col">
            <label
              for="name"
              class="text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div class="flex">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                class="flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Name"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label
              for="email"
              class="text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div class="flex">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                class="flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label
              for="mobile"
              class="text-sm font-medium leading-6 text-gray-900"
            >
              Mobile Number
            </label>
            <div class="flex">
              <input
                id="mobile"
                name="mobile"
                type="text"
                required
                value={formData.mobile}
                onChange={handleChange}
                class="flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Mobile Number"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label
              for="smoke"
              class="text-sm font-medium leading-6 text-gray-900"
            >
              Do you smoke?
            </label>
            <div class="flex">
              <select
                id="smoke"
                name="smoke"
                required
                value={formData.smoke}
                onChange={handleChange}
                class="flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col">
            <label
              for="age"
              class="text-sm font-medium leading-6 text-gray-900"
            >
              Age
            </label>
            <div class="flex">
              <input
                id="age"
                name="age"
                type="number"
                required
                value={formData.age}
                onChange={handleChange}
                class="flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Age"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label
              for="password"
              class="text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div class="flex">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                class="flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label
              for="confirmPassword"
              class="text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div class="flex">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                ref={confirmPasswordRef}
                class="flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Confirm Password"
              />
              {formErrors.confirmPassword && (
                <p className="error">{formErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div class="flex flex-col">
            <label
              for="gender"
              class="text-sm font-medium leading-6 text-gray-900"
            >
              Gender
            </label>
            <div class="flex">
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                class="flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col">
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Signup
            </button>
          </div>

          <p class="mt-4 text-center text-sm text-gray-500">
            Already have an account?
            <a
              href="/"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
