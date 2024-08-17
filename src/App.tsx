// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserDetailsTab from './components/UserDetailsTab'; 
import AccountCreationTab from './components/AccountCreationTab'; 
import Home from './components/Home';

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Router>
        <Navbar />
        {/* Navbar and Routing */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/userDetails" element={<UserDetailsTab />} />
            <Route path="/dashboard/accountCreation" element={<AccountCreationTab />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
