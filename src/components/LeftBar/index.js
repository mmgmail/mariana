import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function LeftBar({ onDragStart, itemData }) {
  return (
    <ImageList sx={{ height: 350 }} cols={2} rowHeight={164}>
      {itemData.map((item, idx) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            draggable="true"
            onDragStart={(e) => onDragStart(e, idx)}
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
};
