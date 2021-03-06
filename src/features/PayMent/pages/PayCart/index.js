import React, { useEffect, useState } from 'react';
import { Box, Divider, Collapse } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AddBtnClick, DelBtnClick, SubBtnClick } from 'features/Slice/index.js';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

export default function PayCard() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart.listProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    cart.map(function calcTotal(item) {
      newTotal = newTotal + item.cost * item.quantity;
      return newTotal;
    });
    setTotal(newTotal);
  }, []);

  const onSubBtnClick = (id) => {
    const idx = cart.findIndex((item) => item.id === id);
    dispatch(SubBtnClick(idx));
    const newTotal = total - cart[idx].cost;
    setTotal(newTotal);
  };

  const onAddBtnClick = (id) => {
    const idx = cart.findIndex((item) => item.id === id);
    dispatch(AddBtnClick(idx));
    const newTotal = total + cart[idx].cost;
    setTotal(newTotal);
  };

  const onDelBtnClick = (id) => {
    const idx = cart.findIndex((item) => item.id === id);
    const newTotal = total - cart[idx].cost * cart[idx].quantity;
    setTotal(newTotal);
    dispatch(DelBtnClick(idx));
  };

  function renderItem({ item }) {
    return (
      <Box key={item.id} className={classes.productItem}>
        <img src={item.image} alt="" />
        <Box className={classes.itemInfo}>
          <p>{item.name}</p>
          <Box className={classes.quantity}>
            <Box onClick={() => onSubBtnClick(item.id)}>
              <RemoveIcon sx={{ cursor: 'pointer' }} />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <span style={{ color: '#ff8000' }}>{item.quantity}</span>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box onClick={() => onAddBtnClick(item.id)}>
              <AddIcon sx={{ cursor: 'pointer' }} />
            </Box>
          </Box>
          <p style={{ fontSize: '10px', lineHeight: 6 / 5 }}>
            {item.size}, {item.sole}
            {item.topping !== '' ? `, ${item.topping}` : ''}
          </p>
        </Box>
        <Box className={classes.price}>
          <HighlightOffIcon
            onClick={() => onDelBtnClick(item.id)}
            sx={{ float: 'right', mb: 2, cursor: 'pointer' }}
          />
          <p>
            {item.cost * item.quantity}
            <span style={{ color: '#ff8000' }}>??</span>
          </p>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.cart}>
          <span>Gi??? h??ng</span>
          <Box className={classes.productList}>
            <TransitionGroup>
              {cart.map((item) => (
                <Collapse key={item.id}>{renderItem({ item })}</Collapse>
              ))}
            </TransitionGroup>
            {/* {cart.map((item) => (
              <Box key={item.id} className={classes.productItem}>
                <img src={item.image} alt="" />
                <Box className={classes.itemInfo}>
                  <p>{item.name}</p>
                  <Box className={classes.quantity}>
                    <Box onClick={() => onSubBtnClick(item.id)}>
                      <RemoveIcon sx={{ cursor: 'pointer' }} />
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box>
                      <span style={{ color: '#ff8000' }}>{item.quantity}</span>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box onClick={() => onAddBtnClick(item.id)}>
                      <AddIcon sx={{ cursor: 'pointer' }} />
                    </Box>
                  </Box>
                  <p style={{ fontSize: '10px', lineHeight: 6 / 5 }}>
                    {item.size}, {item.sole}
                    {item.topping !== '' ? `, ${item.topping}` : ''}
                  </p>
                </Box>
                <Box className={classes.price}>
                  <HighlightOffIcon
                    onClick={() => onDelBtnClick(item.id)}
                    sx={{ float: 'right', mb: 2, cursor: 'pointer' }}
                  />
                  <p>
                    {item.cost * item.quantity}
                    <span style={{ color: '#ff8000' }}>??</span>
                  </p>
                </Box>
              </Box>
            ))} */}
          </Box>

          {/* T???ng ti???n */}
          <Box className={classes.total}>
            <Box className={classes.fee}>
              {/* <p>
                T???ng ti???n h??ng
                <span>
                  {total}
                  <span>??</span>
                </span>
              </p>
              <p>
                Ph?? v???n chuy???n
                <span>
                  {total ? 22000 : 0}
                  <span>??</span>
                </span>
              </p>
              <p>
                T???ng thanh to??n
                <span>
                  {total + (total ? 22000 : 0)}
                  <span>??</span>
                </span>
              </p> */}
              <table>
            <tr>
              <td style={{paddingRight: '10px'}}>T???ng ti???n h??ng</td>
              <td style={{textAlign: 'right'}}>{total}
                  <span>??</span></td>
            </tr>
            <tr>
              <td style={{paddingRight: '10px'}}>Ph?? v???n chuy???n</td>
              <td style={{textAlign: 'right'}}>{total ? 22000 : 0}
                  <span>??</span></td>
            </tr>
            <tr style={{fontWeight: '700', fontSize: '16px'}}>
              <td style={{paddingRight: '10px'}}>T???ng thanh to??n</td>
              <td style={{textAlign: 'right'}}>{total + (total ? 22000 : 0)}
                  <span>??</span></td>
            </tr>
          </table>
            </Box>
            <span onClick={() => navigate('/', { replace: true })}>
              Ti???p t???c mua h??ng
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}