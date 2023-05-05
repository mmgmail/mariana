
import * as React from 'react';
import { Stage, Layer, Image, Group, Rect, Util } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image, refShape, refGroup }) => {
  const [img] = useImage(image.src.src);
  return (
    <Group
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable={true}
      ref={refGroup}
    >
      <Rect
        width={img ? img.width : 0}
        height={img ? img.height : 0}
        fill={'grey'}
        ref={refShape}
      />
        <Image
          image={img}
          
          shadowColor={'black'}
        />
      
    </Group>
  );
};

export default function RightBar({ stageRef, images, onDragOver, onDrop }) {
  const [dragging, setDragging] = React.useState(false);
  const refLayer = React.useRef(null);
  const refGroup = React.useRef(null);
  const refShape = React.useRef(null);
  let detectedSide;

  const handlerDragMove = (e) => {
    setDragging(true);
    const target = e.target;
    const targetRect = e.target.getClientRect();
    const x1 = targetRect.x;
    const y1 = targetRect.y;
    const ox1 = target.attrs.offsetX;
    const oy1 = target.attrs.offsetY;
    const w1 = targetRect.width;
    const h1 = targetRect.height;

    refLayer.current.children.forEach(function (group) {
      const groupRect = group.getClientRect();
      const x2 = groupRect.x;
      const y2 = groupRect.y;
      const ox2 = group.attrs.offsetX;
      const oy2 = group.attrs.offsetY;
      const w2 = groupRect.width;
      const h2 = groupRect.height;
    
      if (x1 + w1 < x2) {
        detectedSide = 'left';
      } else if (x1 > x2 + w2) {
        detectedSide = 'right';
      } else if (y1 + h1 < y2) {
        detectedSide = 'top';
      } else if (y1 > y2 + h2) {
        detectedSide = 'bottom';
      } else {
        // console.log('intersecting')
      }
      // console.log(detectedSide)
  
      if (group === target) {
        return;
      }
      if (haveIntersection(group.getClientRect(), targetRect)) {
        setDragging(false);
        
        switch(detectedSide) {
          case 'left': {
            target.to({
              x: x2 - ox2,
              y: y2 + oy2,
            })
            break;
          }
          case 'right': {
            target.to({
              x: x2 + ox2 + w1,
              y: y2 + oy2,
            })
            break;
          }
          case 'top': {
            target.to({
              x: x2 + ox2,
              y: y2 - oy2,
            })
            break;
          }
          case 'bottom': {
            target.to({
              x: x2 + ox2,
              y: y2 + h1 + oy1,
            })
            break;
          }
        }
        
        // group.children[0].attrs.fill = 'red'
      } else {
        //group.children[0].attrs.fill = 'grey'
      }
    });
  }

  function haveIntersection(r1, r2) {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  }

  return (
    <div onDragOver={onDragOver} onDrop={onDrop}>
      <Stage
        width={2000}
        height={800}
        style={{ border: '1px solid grey', backgroundColor: 'lightGrey' }}
        ref={stageRef}
      >
        <Layer
          onDragMove={handlerDragMove}
          ref={refLayer}
        >
          {images.map((image) => {
            return <URLImage
              key={image.src.src}
              image={image}
              stageRef={stageRef}
              refShape={refShape}
              refGroup={refGroup}
            />;
          })}
        </Layer>
      </Stage>
    </div>
  )
}