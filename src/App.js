import * as React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';
import HomeScreen from './screens/HomeScreen';
import ConfiguratorScreen from './screens/ConfiguratorScreen';
import RootScreen from './screens/RootScreen';
import NoMatchScreen from './screens/NoMatchScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootScreen />,
    children: [
      { index: true, element: <HomeScreen /> },
      { 
        path: '/configurator',
        element: <ConfiguratorScreen />,
        children: [
          { path: "/configurator/:id", element: <ConfiguratorScreen /> },
        ],
      },
      
    ],
    errorElement: <NoMatchScreen />,
  },

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
