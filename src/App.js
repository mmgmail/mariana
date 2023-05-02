import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';
import HomeScreen from './screens/HomeScreen';
import RootScreen from './screens/RootScreen';
import NoMatchScreen from './screens/NoMatchScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
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
