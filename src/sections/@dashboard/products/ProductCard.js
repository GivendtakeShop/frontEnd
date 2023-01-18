import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// components
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

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, price, type, quantity } = product;

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
        <Button  size="medium" color="inherit" variant="outlined" startIcon={<Iconify icon="eva:shopping-cart-outline" />}>
        <Link href="#" underline="none" color="inherit">
                   Add to cart
                 </Link>
          </Button>
        <Button  size="medium" color="inherit" variant="outlined" startIcon={<Iconify icon="eva:edit-outline" />}>
        <Link href="#" underline="none" color="inherit">
                   Edit product
                 </Link>
          </Button>
          
          <Button  size="medium" color="inherit" variant="outlined" startIcon={<Iconify icon="eva:trash-2-outline" />}>
          <Link href="#" underline="none" color="inherit">
                   Delete product
                 </Link>
          </Button>
      </Stack>
    </Card>
  );
}
