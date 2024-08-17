// UserDetailPage.tsx
import React, { useState, useEffect } from 'react';

import  WithAuthProtection from './WithAuthProtecttion'

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/Store'; // Adjust the path if needed
import { fetchUserDetails } from '../redux/UserDetailsSlice'; 
import ClipLoader from "react-spinners/ClipLoader";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  creationDate: string;
}

let count = 1;

const UserDetailsTab: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userDetails.userData);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {    
    if (userData.status === 'idle') {
      dispatch(fetchUserDetails(count));
      console.log('updating');
      
    }
  }, [dispatch, userData.status]);



  if (userData.status === 'loading') {
    return <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'><ClipLoader size={100}/></div>;
  }

  if (userData.status === 'failed') {
    return <div>Error: {userData.error}</div>;
  }
  // States

  console.log({ userData, count }, userData.status);

  // function to handle click on table rows 
  const handleRowClick = (user: User): void => {
    setSelectedUser(user);
    setShowModal(true);
  }; 

  // function to close modal
  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  // function to generate report in modal
  const handleGenerateReport = (): void => {
    if (selectedUser) {
      console.log('Generating report for user:', selectedUser);
      alert('Report has been generated');
    }
  };


  return (
    <div className="flex flex-col justify-center items-center py-4">
      <h2 className="text-4xl mt-2 mb-6 text-blue-900 font-extrabold tracking-wide leading-tight">
        User Details
      </h2>
      <div className="flex gap-4 items-center">
      </div>
      <h3 className="mt-4 text-xl font-semibold border-b-2 border-blue-500 pb-2">
        Select a User to Generate Report
      </h3>
      {/* table  */}
      <div className="w-full mt-4 overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="pt-2 pb-3">ID</th> 
              <th className='pt-2 pb-3'>Avatar</th>
              <th className="pt-2 pb-3">First Name</th>
              <th className="pt-2 pb-3">Last Name</th>
              <th className="pt-2 pb-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {userData?.data?.data?.map((user) => (
              <tr
                className={`${user.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 cursor-pointer`}
                key={user.id}
                onClick={() => handleRowClick(user)}
              >
                <td className="pt-2 pb-2 pl-32">{user.id}</td>
                <td className='pt-2 pb-2 pl-32'>
                  <img src={user.avatar} className='w-12 h-12 rounded-full'/>
                </td>
                <td className="pt-2 pb-2 pl-32">{user.first_name}</td>
                <td className="pt-2 pb-2 pl-32">{user.last_name}</td>
                <td className="pt-2 pb-2 pl-32">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination flex flex-row mt-5">
        <button
          className="block rounded-lg bg-gradient-to-tr from-blue-800 to-gray-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={count === 1}
          onClick={() => {
            count -= 1;
            dispatch(fetchUserDetails(count))
          }}
        >
          Previous
        </button>
        <span className="text-lg mx-2">Page {count}</span>
        <button
          className="block rounded-lg bg-gradient-to-tr from-blue-800 to-gray-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={count === 2}
          onClick={() => {
            count += 1;
            dispatch(fetchUserDetails(count))
          }}
        >
          Next
        </button>
      </div>

      {/* modal on click */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <div className="modal-overlay fixed inset-0 bg-black opacity-80 "></div>
          <div className="modal-content relative bg-white w-96 pl-6 pb-6 pr-8 rounded-lg shadow-lg">
            <span
              className="close cursor-pointer relative text-3xl top-[1px] left-full text-red-500"
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <h3 className="text-xl relative inset-0 text-black font-bold font-semibold mb-4">
              User Details
            </h3>
            {selectedUser && (
              <div className="relative">
                <p className="mb-2">
                  <span className="font-bold">Username:</span> {selectedUser.username}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email:</span> {selectedUser.email}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Phone:</span> {selectedUser.phone}
                </p>
                <button
                  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleGenerateReport}
                >
                  Generate Report
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithAuthProtection(UserDetailsTab);
