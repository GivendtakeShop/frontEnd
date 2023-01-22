import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack,  TextField, RadioGroup, FormControlLabel, Button,FormLabel, Radio} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import {  message, Upload  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import token  from "../../../secrets/jwtToken"
import showMessage from '../../../utils/log';

// ----------------------------------------------------------------------

export default function EditProductForm({product}) {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const [file, setFile] = useState(null);
  
const fileList = [
  
];
const beforeUpload = (file) => {
 setFile(file)
  }




const onSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const data = {
    name: formData.get('name'),
    price: formData.get('price'),
    quantity: formData.get('quantity'),
    description: formData.get('description'),
    type: formData.get('type')

  }
  console.log(data);

  
  
  axios.post('http://localhost:8082/v1/products', data ,  { headers: {"Authorization" : `Bearer ${token}`} })
  .then(() => {
    // if(file != null){
    //   axios.post('http://localhost:8082/v1/cover', file ,  { headers: {"Authorization" : `Bearer ${token}`} })
    //   .then(() => {
        
    navigate('/dashboard/products', { replace: true });

      // })

    }

  // }
  )

}

const {name, price, quantity, description, type} = product

  return (
    <>
  <form onSubmit={onSubmit}>

      <Stack spacing={3}>
        


      <TextField name="name" value={name} label="Product name" />

      

     <TextField  name="price" value={price} label="Price" type="number"  />

      <TextField name="quantity" value={quantity} label="Quantity" type="number"  />
        
     
      <TextField name="description" value={description} label="Description" multiline rows={4} />

      <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="Clothes"
    name="type"
       >
         <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
             <FormLabel id="demo-radio-buttons-group-label" >Category :</FormLabel>
             <FormControlLabel name="type" value="CLOTHES" control={<Radio />} label="Clothes" />
             <FormControlLabel name="type" value="ACCESSORIES" control={<Radio />} label="Accessories" />
             <FormControlLabel name="type" value="LIFE_PLANNERS" control={<Radio />} label="Life Planners" />
             </Stack>
     </RadioGroup>
      

      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Add Product
      </LoadingButton>
      </Stack>
      </form>
      
    </>
  );
}