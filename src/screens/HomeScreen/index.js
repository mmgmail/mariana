import * as React from "react";
import { Outlet, Link, Route } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import sofasJson from '../../services/json/sofas.json';
import * as Styled from './styled';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function  HomeScreen () {

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 1, md: 2 }} >
          <Grid item xs={12} md={8}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 4, md: 6 }}>
              {sofasJson?.sofas?.map((item, idx) => (
                <Grid item key={idx} xs={1} sm={2} md={2}>
                  <Link to={`configurator/${item?.link}`}>
                    <Card>
                      <CardActionArea>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {item.name}
                          </Typography>
                        </CardContent>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`${process.env.PUBLIC_URL}${item.pic}`}
                          alt={item.name}
                        />
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>xs=4</Item>
          </Grid>
        </Grid>
      </Box>
      <Outlet />
    </React.Fragment>
  )
};