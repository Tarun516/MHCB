import React, { useState } from "react";

function SignUpForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    userId: "",
    mobile: "",
    gender: "",
    smoke: "",
    profilepic: "",
    age: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        window.location.href = "/";
      } else {
        throw new Error("Response not okay");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Signup
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name input */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Fullname
            </label>
            <input
              id="name"
              name="fullname"
              type="text"
              required
              value={formData.fullname}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              id="userId"
              name="userId"
              type="text"
              required
              value={formData.userId}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Mobile input */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              required
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              {/* Male option */}
              <div className="flex items-center">
                <input
                  id="gender-male"
                  name="gender"
                  type="radio"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="gender-male"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Male
                </label>
              </div>
              {/* Female option */}
              <div className="flex items-center">
                <input
                  id="gender-female"
                  name="gender"
                  type="radio"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="gender-female"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Female
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="gender-other"
                  name="gender"
                  type="radio"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="gender-other"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Other
                </label>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="profilepic"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Pic
            </label>
            <input
              type="file"
              id="profilepic"
              name="pic"
              value={formData.profilepic}
              onChange={handleChange}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
          </div>

          {/* Smoke input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Do you smoke?
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              {/* Yes option */}
              <div className="flex items-center">
                <input
                  id="smoke-yes"
                  name="smoke"
                  type="radio"
                  value="Yes"
                  checked={formData.smoke === "Yes"}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="smoke-yes"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Yes
                </label>
              </div>
              {/* No option */}
              <div className="flex items-center">
                <input
                  id="smoke-no"
                  name="smoke"
                  type="radio"
                  value="No"
                  checked={formData.smoke === "No"}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="smoke-no"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Age input */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              max="100"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Submit button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
