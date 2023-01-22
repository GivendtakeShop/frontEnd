import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import showMessage from '../../../utils/log';
// components
import token from '../../../secrets/jwtToken';
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------
// const UploadImg = () => (
//   <>
//     <Upload
//       listType="picture-card"
//       defaultFileList={[...fileList]}
//       status="done"
//       name='file'
//     >
//       <Button icon={<UploadOutlined />}>Upload</Button>
//     </Upload>
//   </>
// );
//       <UploadImg/>

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product, refresh, setRefresh }) {
  const { id,name, price, type, quantity } = product;
  console.log(product);
  const navigate = useNavigate();

  const cover = `/assets/images/products/${name.toLowerCase()}.jpg`

  const getStatus = (quantity) => {
    if (quantity === 0) {
      return 'sold out';
    } if (quantity === 1) {
      return 'limited';
    } 
    return 'sale';
  }

  const status = getStatus(quantity);
  const deleteProduct = (e) => {
    axios.delete(`http://localhost:8082/v1/products/${e.target.id}`,  { headers: {"Authorization" : `Bearer ${token()}`} })
    .then(()=>{
      setRefresh(!refresh)
      showMessage('Product deleted successfully', 'success')
    })
  }
  const order = (e) => {
    const targetId = e.currentTarget.id;
    const data = {
      productOrders: [{productId: targetId,productQuantity:1}]
    }
    console.log(targetId);
    axios.post(`http://localhost:8082/v1/orders`, data, { headers: {"Authorization" : `Bearer ${token()}`} })
    .then(()=>{
      showMessage('Product ordered successfully', 'success')
      navigate('/dashboard/order', { replace: true });
    })
  }



  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        
          <Typography variant="subtitle1">
            {type}
          </Typography>
          
          <Typography variant="subtitle1">
            {price} DH
          </Typography>        
          
        </Stack>
        <Button  size="medium" color="inherit" variant="outlined" id={id} onClick={order} startIcon={<Iconify icon="eva:shopping-cart-outline" />}>
        <Link href="#" underline="none" color="inherit">
                   Order product
                 </Link>
          </Button>
        <Button  size="medium" color="inherit" variant="outlined" startIcon={<Iconify icon="eva:edit-outline" />}>
        <Link href="#" underline="none" color="inherit">
                   Edit product
                 </Link>
          </Button>
          
          <Button  size="medium" color="inherit" variant="outlined" startIcon={<Iconify icon="eva:trash-2-outline" />} id={id} onClick={deleteProduct}>
          <Link href="#" underline="none" color="inherit">
                   Delete product
                 </Link>
          </Button>
      </Stack>
    </Card>
  );
}
