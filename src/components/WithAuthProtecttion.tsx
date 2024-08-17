// withAuthProtection.tsx
import React, { ComponentType, ReactElement } from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

interface WithAuthProtectionProps extends RouteProps {
  component: ComponentType<any>;
}

const withAuthProtection = (WrappedComponent: ComponentType<any>) => {
  
  return (props: WithAuthProtectionProps): ReactElement => {
    // Checking if auth token exists in local storage
    const authToken = JSON.parse(localStorage.getItem('user_id'));


    if (authToken && authToken.token) {
      // If token exists, render the wrapped component
      return <WrappedComponent {...props} />;
    } else {
      // If no token, redirect to login page
      return <Navigate to="/dashboard/accountCreation" />;
    }
  };
};

export default withAuthProtection;
