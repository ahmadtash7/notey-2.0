import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    // email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/noteyapp/signin/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
        
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to sign up');
  //       console.log(JSON.stringify(formData));
  //     }

  //     console.log('Form submitted successfully');
  //     // Reset the form after successful submission
  //     setFormData({
  //       username: '',
  //       // email: '',
  //       password: '',
  //     });
  //     setError(null);
  //   } catch (error) {
  //     console.error('Error signing up:', error.message);
  //     setError('Failed to sign up. Please try again.');
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch CSRF token from cookies
      // const csrftoken = document.cookie
      //   .split('; ')
      //   .find(row => row.startsWith('csrftoken='))
      //   .split('=')[1];

      //   console.log(csrftoken);

      
  
      const response = await fetch('http://127.0.0.1:8000/noteyapp/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRFToken': csrftoken,  // Include CSRF token in headers
          // 'AUTHORIZATION':  `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
      
      console.log('Form submitted successfully');
      // console.log(response.json());

      const responseData =  await response.json();
      console.log((responseData));
      // console.log(responseData['data'].username);
      // console.log(responseData['data'].password);
      // console.log(responseData['token']);

      const token = responseData['token'];
      console.log(token);
      
      localStorage.setItem('token', token);
      
      // axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      // Reset the form after successful submission
      setFormData({
        username: '',
        password: '',
      });
      
      window.location.href = '/homepage';
      setError(null);
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError('Failed to sign up. Please try again.');
    }
  };
  


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 w-80">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign In
          </button>
          <p className="mt-4 text-sm text-gray-600">
            New User? <a href="#">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
