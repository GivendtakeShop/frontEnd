import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  TextField,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { ColorMultiPicker } from '../../../components/color-utils';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_CATEGORY_OPTIONS = ['ALL', 'ACCESSORIES', 'LIFEPLANNERS', 'CLOTHESS'];


// ----------------------------------------------------------------------S

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }) {
  const [type, setType] = useState('');
  const [below, setBelow] = useState('');
  const [between, setBetween] = useState('');
  const [above, setAbove] = useState('');

const clearAll = (event) => {
    event.preventDefault();
    setType('');
    setBelow('');
    setBetween('');
    setAbove('');
}



  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      type: formData.get('type'),
      below : formData.get('below'),
      above : formData.get('above'),
      between : formData.get('between')

    }
    console.log(data);}

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <form onSubmit={onSubmit}>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
           
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup name="type" value={type} onChange={(e)=>setType(e.target.value)}>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>

            {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Colors
              </Typography>
              <ColorMultiPicker
                name="colors"
                selected={[]}
                colors={FILTER_COLOR_OPTIONS}
                onChangeColor={(color) => [].includes(color)}
                sx={{ maxWidth: 38 * 4 }}
              />
            </div> */}

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
              <TextField name="below" label="bellow XXX " value={below} pattern="^\d+$" size="small" onChange={(e)=>setBelow(e.target.value)}/>
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
              <TextField name="between" label="Between XXX&YYY " value={between} pattern="^\d+&\d+$" size="small" onChange={(e)=>setBetween(e.target.value)}/>
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
              <TextField name="above" label="Above YYY " value={above} pattern="^\d+$" size="small" onChange={(e)=>setAbove(e.target.value)}/>
              </Typography>
            </div>

            {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                        sx={{
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      '&:hover': { opacity: 0.48 },
                    }}
                  />
                ))}
              </RadioGroup>
            </div> */}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Stack spacing={2}>
        <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:baseline-filter-alt" />}
          >
            Apply
          </Button>
          
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={clearAll}
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
          </Stack>
        </Box>
        </form>

      </Drawer>
      
    </>
  );
}
