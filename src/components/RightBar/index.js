
import * as React from 'react';
import Konva from 'konva';
import { Stage, Layer, Image, Group, Rect, Text, Line, Transformer, Util } from 'react-konva';
import useImage from 'use-image';

import Logo from './bg1.png';
import SimpleDialog from '../SimpleDialog';
import GoodsCtx from '../../contexts/goodsCtx';

const URLImage = ({ image, refShape, refLayer, groupProps, isSelected, onSelect, onChange, onDragStart, onRemove, onInfo, onTop, onBottom }) => {
  // console.log('image', image)
  const [img] = useImage(image?.src?.src);
  // console.log('img', img)
  const trRef = React.useRef();
  const refGroup = React.useRef(null);
  const imageRef = React.useRef(null);
  const { colorItem } = React.useContext(GoodsCtx);

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

  const handleTransform = e => {
    const currentRotation = refGroup.current.rotation();
    const nearestRotation = Math.round(currentRotation / 45) * 45;
    refGroup.current.rotation(nearestRotation);
  };

  const applyRGBFilter = () => {
    imageRef.current.cache();
    imageRef.current.filters([Konva.Filters.RGBA]);
    imageRef.current.red(colorItem.color.red); // Adjust the filter parameters as needed
    imageRef.current.green(colorItem.color.green);
    imageRef.current.blue(colorItem.color.blue);
    imageRef.current.alpha(colorItem.color.alpha);
    imageRef.current.getLayer().batchDraw();
  }

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      // trRef.current.nodes([refGroup.current]);
      // trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  React.useEffect(() => {
    if (imageRef.current && img?.width) {
      applyRGBFilter();
    }
  }, [imageRef.current, colorItem?.id, img?.width]);

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
        onTouchstart={onSelect}
        onMouseDown={onSelect}
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
        {isSelected && (
          <Group>
            <Rect
              width={img ? img?.width : 0}
              height={img ? img?.height : 0}
              ref={trRef}
              strokeWidth={2}
              stroke={'white'}
              visible={true}
            />
            <Group
              x={img?.width / 2 - 42.5}
              y={-img?.height / 3}
            >
              <Rect
                width={85}
                height={30}
                strokeWidth={2}
                stroke={'white'}
                fill={'lightgrey'}
              />
              {/* <Line
              x={-img.width * 1.075}
              y={-img.height / 1.44}
                points={[250, 100, 250, 130]}
                stroke="white"
                strokeWidth={1}
              /> */}
              <Text
                x={32}
                y={8}
                text="X"
                fontSize={14}
                fill="grey"
                onClick={onRemove}
              />
              <Text
                x={10}
                y={8}
                text="?"
                fontSize={14}
                fill="grey"
                onClick={onInfo}
              />
              <Text
                x={53}
                y={5}
                text="↑"
                fontSize={18}
                fill="grey"
                onClick={onTop}
              />
              <Text
                x={68}
                y={5}
                text="↓"
                fontSize={18}
                fill="grey"
                onClick={onBottom}
              />
            </Group>
          </Group>
        )}

        <Image
          ref={imageRef}
          image={img}
        />  
        
      </Group>
      {/* {isSelected && (
        <Transformer
          ref={trRef}
          resizeEnabled={true}
          anchorSize={20}
          borderDash={[3, 3]}
          transformerConfig={{
            rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315],
          }}
        />
      )} */}
    </React.Fragment>
  );
};

export default function RightBar({ stageRef, images, onDragOver, onDrop, setImages }) {
  const [rectangles, setRectangles] = React.useState(images);
  const [detectedSide, setDetectedSide] = React.useState(false);
  const [selectedId, selectShape] = React.useState(null);
  const [currItem, setCurrItem] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  
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
    <React.Fragment>
      <SimpleDialog item={currItem} open={open} onClose={() => setOpen(false)} />
      <div onDragOver={onDragOver} onDrop={onDrop} style={{ width: '100%', position: 'relative' }}>
        <img src={Logo}
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 800 }}
        />
        <Stage
          width={1330}
          height={800}
          style={{ border: '1px solid grey', backgroundColor: 'transparent' }}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer
            onDragMove={handlerDragMove}
            ref={refLayer}
          >
              {images.map((image, i) => {
              return (
                <URLImage
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
                  onRemove={() => {
                    const filterRects = images.filter((el) => el.src.id !== selectedId);
                    setImages(filterRects);
                  }}
                  onInfo={() => {
                    setCurrItem(image?.src?.item);
                    setTimeout(() => {
                      setOpen(true);
                    }, 10);
                  }}
                  onTop={() => {
                    const items = images.slice();
                    const item = items.find((el) => el.src.id === selectedId);
                    const index = items.indexOf(item);
                    items.splice(index, 1);
                    items.push(item);
                    setImages(items);
                  }}
                  onBottom={() => {
                    const items = images.slice();
                    const item = items.find((el) => el.src.id === selectedId);
                    const index = items.indexOf(item);
                    items.splice(index, 1);
                    items.unshift(item);
                    setImages(items);
                  }}
                />);
            })}
          </Layer>
        </Stage>
      </div>
    </React.Fragment>
  )
}