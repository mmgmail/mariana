import * as React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import HomeScreen from "../HomeScreen";
import { Outlet } from "react-router-dom";
// import * as Styled from './styled';

export default function RootScreen() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Outlet />
    </React.Fragment>
  )
};