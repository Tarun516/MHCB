import React, { useState, useRef } from 'react';
import axios from 'axios';

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    smoke: '',
    age: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    confirmPassword: ''
  });
// Hook to access the history object
  const confirmPasswordRef = useRef(null); // Ref for the confirm password input element

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Check if the password and confirm password fields match
    if (name === 'password' || name === 'confirmPassword') {
      const password = formData.password;
      const confirmPassword = formData.confirmPassword;
      if (password !== confirmPassword) {
        setFormErrors({ ...formErrors, confirmPassword: 'Passwords do not match' });
      } else {
        setFormErrors({ ...formErrors, confirmPassword: '' });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      confirmPasswordRef.current.focus(); // Set focus on the confirm password field
      return;
    }
  
    try {
      // Make API request to your backend server to save the user data
      const response = await axios.post('/api/signup', formData);
      console.log('Response:', response.data);
  
      // Redirect to login page upon successful signup
      window.location.href = '/login';
    } catch (error) {
      console.error('Error:', error);
      // Handle error scenario here (e.g., display error message to the user)
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required />
        <select name="smoke" value={formData.smoke} onChange={handleChange} required>
          <option value="">Do you smoke?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <input ref={confirmPasswordRef} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
        {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignUpForm;
