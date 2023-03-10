import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  Link,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import showMessage from '../utils/log';

import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import token  from '../secrets/jwtToken';

import { OrderListHead, OrderListToolbar } from '../sections/@dashboard/order';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Order ID', alignRight: false },
  { id: 'orderdate', label: 'Order Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'totalPrice', label: 'Total Price', alignRight: false },
  { id: 'genereateBill', label: 'Generate Bill', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    console.log(array);
    console.log(query);
    return filter(array, (_order,index) => (index+1).toString().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  
  const [selectedIds, setSelectedIds] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderList, setOrderList] = useState([]);


  const [id, setId] = useState('');


  const [refeshOrderList, setRefeshOrderList] = useState(false);

  const handleOpenMenu = (event) => {
    setId(event.currentTarget.id);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderList.map((n) => n.id);
      const newSelectedsIds = orderList.map((n) => n.id);
      setSelected(newSelecteds);
      setSelectedIds(newSelectedsIds);
      console.log(selectedIds);
      return;
    }
    
    setSelected([]);
    setSelectedIds([]);
    
  };

  const handleClick = (event, name,id) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    let newSelectedIds = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, selectedIndex), selectedIds.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
    setSelectedIds(newSelectedIds);
    console.log(newSelected);
    console.log(newSelectedIds);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    console.log(event.target.value);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;
  useEffect(()=>{
    axios.get('http://localhost:8082/v1/orders',  { headers: {"Authorization" : `Bearer ${token()}`} })
    .then(({data})=>{
      setOrderList(data.content)
      console.log(data);
    })
  },[])
  const filteredOrders = applySortFilter(orderList, getComparator(order, orderBy), filterName);


  const isNotFound = !filteredOrders.length && !!filterName;

  const generateBill = (e) => {
      showMessage('Bill generated successfully. Check your email','success');
  }
  return (
    <>
     <ToastContainer />
      <Helmet>
        <title> Orders Page</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            Orders
          </Typography>
        </Stack>

        <Card>
          <OrderListToolbar setSelectedIds={setSelectedIds} selectedIds={selectedIds} numSelected={selectedIds.length} filterName={filterName} onFilterName={handleFilterByName} 
           setOpen={setOpen} refeshOrderList={refeshOrderList} setRefeshOrderList={setRefeshOrderList} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OrderListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orderList.length}
                  numSelected={selectedIds.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  { filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                    
                
                    const { id, orderDate, status, productOrders } = row;
                    const selectedOrder = selected.indexOf(id) !== -1;
                    const totalPrice = productOrders.reduce((acc, p) => acc + p.productQuantity * p.product.price, 0);
                    console.log(productOrders);
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedOrder}>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" justifyContent="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {index+1}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {orderDate}
                            </Typography>
                          </Stack>
                        </TableCell>


                        <TableCell align="left">
                          <Label color={(status === 'DELIVERING' && 'error') || 'success'}>{status}</Label>
                        </TableCell>
                        <TableCell align="left">{totalPrice} DH</TableCell>
                        <TableCell align="left">
                            <Button  size="medium" color="inherit" variant="outlined" id={id} startIcon={<Iconify icon="ic:outline-file-download" />}>
                                <Link href="#" underline="none" color="inherit" onClick={generateBill}>
                                Generate Bill
                                </Link>
                            </Button>
                        </TableCell>

                      
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orderList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
