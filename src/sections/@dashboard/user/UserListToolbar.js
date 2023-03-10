import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// component
import axios from 'axios';

import showMessage from '../../../utils/log';


import token from '../../../secrets/jwtToken';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  selectedIds: PropTypes.array,
  setOpen: PropTypes.func,
  refeshUserList: PropTypes.bool,
  setRefeshUserList: PropTypes.func
};

export default function UserListToolbar({ numSelected, filterName, onFilterName, selectedIds, setOpen, refeshUserList, setRefeshUserList, setSelectedIds }) {
console.log(token);
const idsNb = selectedIds.length;
  const deleteUsers = () => {
    selectedIds.forEach((id,index) => {
      axios.delete(`http://localhost:8082/v1/users/${id}`,  { headers: {"Authorization" : `Bearer ${token}`} })
      .then(()=>{
      setOpen(null);
      if(index === idsNb-1){
        setRefeshUserList(!refeshUserList);
        setSelectedIds([]);
        showMessage(`User${idsNb>1?'s':''} deleted successfully`,'success');
      }
      })
    })
  }

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteUsers}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : null}
    </StyledRoot>
  );
}
