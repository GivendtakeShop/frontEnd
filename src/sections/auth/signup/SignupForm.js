import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link,Radio, FormLabel, FormControlLabel, Stack, IconButton, InputAdornment, TextField, Checkbox, RadioGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
      <TextField name="user name" label="User Name" />
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
    name="radio-buttons-group"
       >
         <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
             <FormLabel id="demo-radio-buttons-group-label" >Gender :</FormLabel>
             <FormControlLabel value="MALE" control={<Radio />} label="Male" />
             <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
             </Stack>
     </RadioGroup>
      


      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Sign Up
      </LoadingButton>
      </Stack>

    </>
  );
}
