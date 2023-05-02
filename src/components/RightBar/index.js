
import * as React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image }) => {
  console.log('URLImage', image)
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

export default function RightBar({ stageRef, images, onDragOver }) {

  console.log('images', images)
  
  return (
    <div onDragOver={onDragOver}>
      <Stage
        width={'100%'}
        height={800}
        style={{ border: '1px solid grey', backgroundColor: 'lightGrey' }}
        ref={stageRef}
      >
        <Layer>
          {images.map((image) => {
            return <URLImage image={image} />;
          })}
        </Layer>
      </Stage>
    </div>
  )
}