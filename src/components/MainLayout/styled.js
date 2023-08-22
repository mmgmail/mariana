import styled from '@emotion/styled'
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';

export const ImageListItemStyled = styled(ImageListItem)`
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

export const LinkStyled = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  color: #81ab00;
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
  text-decoration: none;
`;

export const ClothItem = styled.div`
  width: 35px;
  height: 35px;
  min-width: 35px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ brColor }) => brColor ? 'black' : 'lightgray'};
  margin-right: 10px;
  background-color: ${({ color }) => 'rgba(' + color.red + ',' + color.green + ',' + color.blue + ',' + color.alpha + ')'};
`;