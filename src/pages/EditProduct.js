import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Button, Link} from '@mui/material';

import {  message, Upload  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

import Iconify from '../components/iconify';
import EditProductForm from '../sections/@dashboard/products/EditProductForm';


// ----------------------------------------------------------------------
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};





export default function EditProduct({product}) {
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
        <title> Edit Product </title>
      </Helmet>

      <Container>
      {/* <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Edit Product
        </Typography>
        {/* <Typography variant="h3" sx={{ mb: 5 }}>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} justifyContent="flex-end">
        <Link href="#" underline="none" color="inherit">
          New Product
        </Link>
        </Button>
        </Typography> */}
        </Stack>
        

        <EditProductForm/>
      </Container>
    </>
  );
}
