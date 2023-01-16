import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import axios  from 'axios';
// @mui
import { Container, Stack, Typography, Button, Link} from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

import Iconify from '../components/iconify';
import { PRODUCTS_URL } from '../constants/endpoints';



// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState(PRODUCTS);
  const [filterOptions, setFilterOptions] = useState(undefined);


  useEffect(() => {
    if(filterOptions === undefined) {
      axios({
        method: 'get',
        url: PRODUCTS_URL
      })
        .then(({data}) => {
          console.log(data);
          setProducts(data);
        });
    }
   
    
    }, [filterOptions]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Products Page </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Typography variant="h3" sx={{ mb: 5 }}>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} justifyContent="flex-end">
        <Link href="/dashboard/addproduct" underline="none" color="inherit">
          New Product
        </Link>
        </Button>
        </Typography>
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
