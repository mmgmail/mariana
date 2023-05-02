import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LeftBar from '../LeftBar';
import RightBar from '../RightBar';

export default function MainLayout() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <RightBar />
        </Grid>
        <Grid item xs={12} md={3}>
          <LeftBar />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}