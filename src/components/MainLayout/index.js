import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LeftBar from '../LeftBar';
import RightBar from '../RightBar';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default function MainLayout() {
  const dragUrl = React.useRef({ src: null, idx: -1 });
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);

  const handleDragOver= (e) => {
    console.log('e1', e)
    e.stopPropagation();
    e.preventDefault();
    // register event position
    // stageRef.current.setPointersPositions(e);
    // add image
    // setImages(
    //   images.concat([
    //     {
    //       ...stageRef.current.getPointerPosition(),
    //       src: dragUrl.current,
    //     },
    //   ])
    // );
  }

  const handledragStart = (e, idx) => {
    console.log('e2', e)
    dragUrl.current = { src: e.target.src, idx };
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <RightBar images={images} stageRef={stageRef} onDragOver={handleDragOver} />
        </Grid>
        <Grid item xs={12} md={3}>
          <LeftBar onDragStart={handledragStart} itemData={itemData} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}