import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link,Radio, FormLabel, FormControlLabel, Stack, IconButton, InputAdornment, TextField, Checkbox, RadioGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import axios from 'axios';

import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };


  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      userName: formData.get('userName'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      gender: formData.get('gender'),
      email: formData.get('email'),
      password : formData.get('password')
    }
    
    
    axios.post('http://localhost:8082/v1/auth/signup', data)
    .then(() => {
      navigate('/login', { replace: true });
    })

  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
      <TextField name="userName" label="User Name" />
      <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

      <TextField name="address" label="Address" />

      <TextField name="phone" label="Phone" />

      <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="MALE"
    name="gender"
       >
         <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
             <FormLabel id="demo-radio-buttons-group-label" >Gender :</FormLabel>
             <FormControlLabel value="MALE" name='gender' control={<Radio />} label="Male" />
             <FormControlLabel value="FEMALE" name='gender' control={<Radio />} label="Female" />
             </Stack>
     </RadioGroup>
      


      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Sign Up
      </LoadingButton>
      </Stack>
      </form>

    </>
  );
}
