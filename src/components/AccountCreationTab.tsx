
import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { RootState, AppDispatch } from '../redux/Store'; // Adjust the path if needed
import { userRegisteration } from '../redux/UserDetailsSlice'; 


const AccountCreationTab: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userDetails.userAuth);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userAuth, setUserAuth] = useState<object>({})

  useEffect(()=>{
    localStorage.setItem('user_id', JSON.stringify(userData.token))
  },[userData.status])

  // function to handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any field is blank
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Dispatch the registration action and wait for it to complete
      await dispatch(userRegisteration({ email, password })).unwrap();
  
      alert(`Account created successfully!\nEmail: ${email}\nPassword: ${password}`);
  
      // Reset fields after successful submission
      setEmail('');
      setPassword('');
  
      // Navigate to a different route after successful form submission
      navigate('/dashboard/userDetails');
    } catch(error) {
      // Handle error if registration fails
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4 p-4">
      <h2 className="text-4xl mt-2 mb-6 text-blue-900 font-extrabold tracking-wide leading-tight">
        Register Yourself First!
      </h2>
      <p>use email : "eve.holt@reqres.in" & password : "pistol", this API accepts this only</p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="password" className="block mt-4 text-gray-700 text-sm font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue hover:animation-wiggle"

        >
          {userData.status === 'loading' ?  <ClipLoader color='white'/> : userData.status === 'succeeded' ? 'submit' : 'submit'  }
        </button>
      </form>
    </div>
  );
};

export default AccountCreationTab;
