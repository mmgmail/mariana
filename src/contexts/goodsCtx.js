import * as React from 'react';
import clothJson from '../services/json/cloth.json';

const GoodsCtx = React.createContext({
  colorItem: clothJson.list[0],
});

export default GoodsCtx;