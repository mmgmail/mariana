import * as React from 'react';
import { useParams } from "react-router-dom";

import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import RightBar from '../RightBar';
import GoodsCtx from '../../contexts/goodsCtx';
import goodsJson from '../../services/json/goods.json';
import sofasJson from '../../services/json/sofas.json';
import * as S from './styled';

export default function MainLayout() {
  const dragUrl = React.useRef({ src: null, idx: -1 });
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const goodsCtx = React.useContext(GoodsCtx);
  const [cost, setCost] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const { id: itemId } = useParams();
  const good = sofasJson.sofas.find(item => item.link === itemId);

  const handleDragOver= (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const handledragStart = (e, idx, item) => {
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
      arrSum.push(+images[i]?.src?.item?.cloth['1'].price);
      arrWidth.push(+images[i]?.src?.item?.width);
      arrLength.push(+images[i]?.src?.item?.depth);
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
                  {good?.parts?.map((item, idx) => {
                    return (
                      <S.ImageListItemStyled key={idx}>
                        <img
                          src={`${process.env.PUBLIC_URL}${item.pic}`}
                          alt={item.name}
                          loading="lazy"
                          draggable="true"
                          onDragStart={(e) => handledragStart(e, idx, item)}
                          style={{ maxWidth: '50%', maxHeight: '50%', objectFit: 'contain' }}
                        />
                      </S.ImageListItemStyled>
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