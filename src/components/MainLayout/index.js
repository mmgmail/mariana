import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LeftBar from '../LeftBar';
import RightBar from '../RightBar';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    id: 0,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    id: 1,
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    id: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    id: 3,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    id: 4,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    id: 5,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    id: 6,
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    id: 7,
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    id: 8,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    id: 9,
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    id: 10,
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    id: 11,
  },
];

export default function MainLayout() {
  const dragUrl = React.useRef({ src: null, idx: -1 });
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);

  const handleDragOver= (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handledragStart = (e, idx) => {
    // console.log('e2', dragUrl.current)
    const id = "id" + Math.random().toString(16).slice(2);
    dragUrl.current = { src: e.target.src, idx, id  };
  }

  const onDropHandler = (e) => {
    // console.log('e3', dragUrl.current)
    e.stopPropagation();
    e.preventDefault();
    // register event position
    stageRef.current.setPointersPositions(e);
    // add image
    setImages(
      images.concat([
        {
          ...stageRef.current.getPointerPosition(),
          src: dragUrl.current,
        },
      ])
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <RightBar images={images} setImages={setImages} stageRef={stageRef} onDragOver={handleDragOver} onDrop={onDropHandler} />
        </Grid>
        <Grid item xs={12} md={3}>
          {/* <LeftBar onDragStart={handledragStart} itemData={itemData} /> */}
          <ImageList sx={{ height: 750 }} cols={2} rowHeight={164}>
          {itemData.map((item, idx) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                draggable="true"
                onDragStart={(e) => handledragStart(e, idx)}
              />
            </ImageListItem>
          ))}
        </ImageList>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}