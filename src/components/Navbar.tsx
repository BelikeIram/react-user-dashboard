
import React from 'react';
import { NavLink } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/Store'; // Adjust the path if needed
import { authRevocation } from '../redux/UserDetailsSlice'; 
import { useSelector, useDispatch} from 'react-redux';

const Navbar: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userDetails.userAuth);
  const dispatch = useDispatch()

  return (
    <div className='mx-auto block w-full border border-white/80 bg-white bg-opacity-90 py-2 px-4 text-gray-900 shadow-md backdrop-blur-3xl backdrop-saturate-300 lg:px-8 lg:py-4'>
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className='lg:mr-20 flex items-center gap-6'>
          {/* Link to Home Page */}
          <NavLink 
            to="/"
            className={({ isActive }) => `block p-1 ${isActive ? 'text-sky-700 font-bold' : ''} hover:text-sky-700 font-sans text-xl font-normal leading-normal text-inherit antialiased`}
          >
            Home
          </NavLink>
          {/* Link to User Details Page */}
          <NavLink 
            to="/dashboard/userDetails"
            className={({ isActive }) => `block p-1 ${isActive ? 'text-sky-700 font-bold' : ''} hover:text-sky-700 font-sans text-xl font-normal leading-normal text-inherit antialiased`}
          >
            User Details
          </NavLink>
          {/* Link to User Account Creation Page */}
          {
            userData.isAuth ? (
              <NavLink
              to="/dashboard/accountCreation"
              className={({ isActive }) => `block p-1 ${isActive ? 'text-sky-700 font-bold' : ''} hover:text-sky-700 font-sans text-xl font-normal leading-normal text-inherit antialiased`}
            >
              Account Creation
            </NavLink>
            ) : (
              <NavLink 
                className={({ isActive }) => `block p-1 ${isActive ? 'font-bold' : ''} hover:text-sky-700 font-sans text-xl font-normal leading-normal text-inherit antialiased`}
                onClick={()=> {
                  localStorage.removeItem('user_id')
                  dispatch(authRevocation())
                }}
              >
                Logout
              </NavLink>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
