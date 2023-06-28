
import * as React from 'react';
import { Stage, Layer, Image, Group, Rect, Transformer, Util } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image, refShape, refLayer, groupProps, isSelected, onSelect, onChange, onDragStart }) => {
  console.log('image', image)
  const [img] = useImage(image?.src?.src);
  const trRef = React.useRef();
  const refGroup = React.useRef(null);

  // function updateSelectionBox() {
  //   console.log(' refShape.current',  refShape.current)
  //   refShape.current.visible(true);
  //   // refShape.current.width(refGroup.current.width());
  //   // refShape.current.height(refGroup.current.height());
  //   // refShape.current.position({
  //   //   x: refGroup.current.x(),
  //   //   y: refGroup.current.y()
  //   // });
  //   // refShape.current.rotation(refGroup.current.rotation());
  // }

  function hideSelectionBox() {
    refShape.current.visible(false);
  }

  const handleTransform = e => {
    const currentRotation = refGroup.current.rotation();
    const nearestRotation = Math.round(currentRotation / 45) * 45;
    refGroup.current.rotation(nearestRotation);
  };

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([refGroup.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Group
        x={image.x}
        y={image.y}
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        draggable={true}
        ref={refGroup}
        {...groupProps}
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={onDragStart}
        onDragEnd={(e) => {
          onChange({
            ...groupProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = refGroup.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...groupProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            // width: Math.max(node.width() * scaleX),
            // height: Math.max(node.height() * scaleY),
          });
        }}
      >
        {/* <Rect
          width={img ? img.width : 0}
          height={img ? img.height : 0}
          ref={refShape}
          strokeWidth={3}
          stroke={'red'}
          visible={false}
        /> */}
        <Image
          image={img}
          shadowColor={'black'}
        />
        
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          resizeEnabled={false}
          anchorSize={20}
          borderDash={[3, 3]}
          transformerConfig={{
            rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315],
          }}
        />
      )}
    </React.Fragment>
  );
};

export default function RightBar({ stageRef, images, onDragOver, onDrop, setImages }) {
  const [rectangles, setRectangles] = React.useState(images);
  const [detectedSide, setDetectedSide] = React.useState(false);
  const [selectedId, selectShape] = React.useState(null);

  const refLayer = React.useRef(null);
  
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handlerDragMove = (e) => {
    setDetectedSide(null);
    const target = e.target;
    const targetRect = e.target.getClientRect();
    const x1 = targetRect.x;
    const y1 = targetRect.y;
    const ox1 = target.attrs.offsetX;
    const oy1 = target.attrs.offsetY;
    const w1 = targetRect.width;
    const h1 = targetRect.height;

    refLayer.current.children.forEach(function (group) {
      if (group === target) {
        return;
      }

      const groupRect = group.getClientRect();
      const x2 = groupRect.x;
      const y2 = groupRect.y;
      const ox2 = group.attrs.offsetX;
      const oy2 = group.attrs.offsetY;
      const w2 = groupRect.width;
      const h2 = groupRect.height;
      // console.log('group', group);
    
      if (x1 + w1 < x2) {
        setDetectedSide('left');
      } else if (x1 > x2 + w2) {
        setDetectedSide('right');
      } else if (y1 + h1 < y2) {
        setDetectedSide('top');
      } else if (y1 > y2 + h2) {
        setDetectedSide('bottom');
      } else {
        // console.log('intersecting')
      }
      // console.log(detectedSide)

      if (haveIntersection(group.getClientRect(), targetRect)) {
        // switch(detectedSide) {
        //   case 'left': {
        //     target.to({
        //       x: x2 - ox2,
        //       y: y2 + oy2,
        //     })
        //     break;
        //   }
        //   case 'right': {
        //     target.to({
        //       x: x2 + ox2 + w1,
        //       y: y2 + oy2,
        //     })
        //     break;
        //   }
        //   case 'top': {
        //     target.to({
        //       x: x2 + ox2,
        //       y: y2 - oy2,
        //     })
        //     break;
        //   }
        //   case 'bottom': {
        //     target.to({
        //       x: x2 + ox2,
        //       y: y2 + h1 + oy1,
        //     })
        //     break;
        //   }
        // }
        
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
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer
          onDragMove={handlerDragMove}
          ref={refLayer}
        >
          {images.map((image, i) => {
            return <URLImage
              key={i}
              image={image}
              stageRef={stageRef}
              refLayer={refLayer}
              shapeProps={image}
              isSelected={image.src.id === selectedId}
              onSelect={(e) => {
                selectShape(image?.src?.id);
              }}
              onChange={(newAttrs) => {
                const rects = images.slice();
                rects[i] = {...image, ...newAttrs};
                setImages(rects);
              }}
            />;
          })}
        </Layer>
      </Stage>
    </div>
  )
}