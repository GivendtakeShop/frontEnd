import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack,  TextField, RadioGroup, FormControlLabel, FormLabel, Radio} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------

export default function AddProductForm() {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  

  return (
    <>
      <Stack spacing={3}>
      <TextField name="name" label="Product name" />

      

     <TextField  name="Price" label="Price" type="number"  />

      <TextField name="Quantity " label="Quantity" type="number"  />
        
     
      <TextField name="Description" label="Description" multiline rows={4} />

      <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="Clothes"
    name="radio-buttons-group"
       >
         <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
             <FormLabel id="demo-radio-buttons-group-label" >Category :</FormLabel>
             <FormControlLabel value="Clothes" control={<Radio />} label="Clothes" />
             <FormControlLabel value="Accessories" control={<Radio />} label="Accessories" />
             <FormControlLabel value="LifePlanners" control={<Radio />} label="Life Planners" />
             </Stack>
     </RadioGroup>
      

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Add Product
      </LoadingButton>
      </Stack>
      
    </>
  );
}