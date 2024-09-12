import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { constructMenuItems } from 'src/utils/menu-helper';

export default function SimpleDialog(props) {
  const { onClose, open, id, order } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <>
      <DialogTitle sx={{textAlign:"center"}}>Order</DialogTitle>
      <ul style={{padding:"1rem 5rem"}}>
        <li>
        <p><b>{"ID -"}</b> {order.id}</p>
        </li>
        <li>
        <p><b>{"Customer -"}</b> {order.customerId}</p>
        </li>
        <li>
        <p><b>{"Date -"}</b> {order.date}</p>
        </li>
        <li>
        <p><b>{"Items -"}</b> {constructMenuItems(order.itemIds)}</p>
        </li>
        <li>
        <p><b>{"Total Price -"}</b> {order.totalPrice}</p>
        </li>
      </ul>
      </>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  id: PropTypes.string
};
