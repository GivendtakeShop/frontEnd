import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Button, Link} from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

import Iconify from '../components/iconify';
import AddProductForm from '../sections/@dashboard/products/AddProductForm';

// ----------------------------------------------------------------------

export default function AddProductPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Add Product Page </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ mb: 5 }}>
          New Product
        </Typography>
        {/* <Typography variant="h3" sx={{ mb: 5 }}>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} justifyContent="flex-end">
        <Link href="#" underline="none" color="inherit">
          New Product
        </Link>
        </Button>
        </Typography> */}
        </Stack>

        <AddProductForm/>
      </Container>
    </>
  );
}
