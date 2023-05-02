import { Routes, Route, Outlet, Link } from "react-router-dom";

import './App.css';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/HomeScreen';
import NoMatchScreen from './screens/NoMatchScreen';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />}>
          <Route index element={<HomeScreen />} />
          <Route path="*" element={<NoMatchScreen />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
