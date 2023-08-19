import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const SimpleDialog = (props) => {
  const { onClose, item, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ width: 300 }}>
        <DialogTitle style={{ textAlign: 'center' }}>{item?.type} {item?.name}</DialogTitle>
        <img src={item?.pic} alt={item?.name} style={{ margin: 'auto', display: 'block', maxWidth: '100%' }}/>
        <List>
          <ListItem>
            <ListItemText primary={`від ${item?.cloth[1].price} грн.`} style={{ textAlign: 'center' }}/>
          </ListItem>
        </List>
      </Box>
    </Dialog>
  );
}

export default SimpleDialog