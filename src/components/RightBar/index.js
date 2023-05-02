
import * as React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image }) => {
  const [img] = useImage(image.src.src);
  console.log('img', img)
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

export default function RightBar({ stageRef, images, onDragOver, onDrop }) {  
  return (
    <div onDragOver={onDragOver} onDrop={onDrop}>
      <Stage
        width={2000}
        height={800}
        style={{ border: '1px solid grey', backgroundColor: 'lightGrey' }}
        ref={stageRef}
      >
        <Layer>
          {images.map((image) => {
            return <URLImage key={image.src.src} image={image} />;
          })}
        </Layer>
      </Stage>
    </div>
  )
}