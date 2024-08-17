// Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-[url('assets/dashboard.jpg')] h-lvh w-full h-[90vh] bg-cover bg-no-repeat bg-center flex justify-start">
      <aside className='md:mx-[5rem] md:my-[5rem] mx-[2rem] my-[2rem] w-full animate-slide-in'>
        <h2 className='text-3xl text-white'>User Management Dashboard</h2>
        <p className='mt-[1.1rem] text-white md:w-[50%] w-full'>
          A user management dashboard is a centralized interface for administrators or managers to oversee and control user accounts within a system or application. It typically provides various tools and features to manage users efficiently, ensuring smooth operation and security of the platform.
        </p>
        <Link 
          to={'/dashboard/userDetails'} 
          className='animate-bounce mt-[1.2rem] inline-block bg-white py-2 px-4 rounded text-[0.92rem]'
        >
          Check Dashboard!
        </Link>
      </aside>
    </div>
  );
};

export default Home;
