import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import axios from 'axios';

import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email'),
      password : formData.get('password')
    }
    axios.post('http://localhost:8082/v1/auth/login', data)
    .then(({data}) => {
      console.log(data.token);
      localStorage.setItem('token', data.token);
      navigate('/dashboard', { replace: true });
    })

  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
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
        <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Login
      </LoadingButton>
      </Stack>
      </form>


      
    </>
  );
}
