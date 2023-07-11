import * as React from 'react';
import Grid from '@mui/material/Grid';
import RightBar from '../RightBar';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import GoodsCtx from '../../contexts/goodsCtx';
import goodsJson from '../../services/json/goods.json';

export default function MainLayout() {
  const dragUrl = React.useRef({ src: null, idx: -1 });
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const goodsCtx = React.useContext(GoodsCtx);
  const [cost, setCost] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [data, setData] = React.useState(null);

  const handleDragOver= (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handledragStart = (e, idx, item) => {
    console.log('e2', dragUrl.current)
    const id = "id" + Math.random().toString(16).slice(2);
    dragUrl.current = { src: e.target.src, idx, id, item };
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

  React.useEffect(() => {
    goodsCtx.items = images;
    let arrSum = [];
    let arrWidth = [];
    let arrLength = [];
    let arrHeight = [];
    for (let i = 0; i < images.length; i++) {
      arrSum.push(+images[i]?.src?.item?.price);
      arrWidth.push(+images[i]?.src?.item?.width);
      arrLength.push(+images[i]?.src?.item?.length);
      arrHeight.push(+images[i]?.src?.item?.height);
    }

    const sumCost = arrSum.reduce((partialSum, a) => partialSum + a, 0);
    const sumWidth = arrWidth.reduce((partialSum, a) => partialSum + a, 0);
    const sumLength = arrLength.reduce((partialSum, a) => partialSum + a, 0);
    const sumHeight = arrHeight.reduce((partialSum, a) => partialSum + a, 0);
    setCost(sumCost);
    setWidth(sumWidth);
    setLength(sumLength);
    setHeight(sumHeight);

  }, [JSON.stringify(images)])

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <RightBar images={images} setImages={setImages} stageRef={stageRef} onDragOver={handleDragOver} onDrop={onDropHandler} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Sofa configuration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ImageList sx={{ height: 550 }} cols={2} rowHeight={164}>
                  {goodsJson?.goods?.map((item, idx) => {
                    const Image = React.lazy(() => import(item.img));
                    return (
                      <ImageListItem key={item.img}>
                        <Image
                          // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                          // src={`${item.img}`}
                          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                          draggable="true"
                          onDragStart={(e) => handledragStart(e, idx, item)}
                        />
                      </ImageListItem>
                    )
                  })
                }
              </ImageList>
            </AccordionDetails>
          </Accordion>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                SOFA SIZE:
              </Typography>
              <Typography variant="h6" component="div">
                Width: {width} sm <br />
                Length: {length} sm <br />
                Height: {height} sm
              </Typography>
              <hr />
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                COST:
              </Typography>
              <Typography variant="h5" component="div">
                {cost} UAH
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}