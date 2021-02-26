// React Table

import {useMemo, useState} from 'react';
import {useTable, useSortBy, usePagination} from 'react-table';
import EMPLOYEES from './columns/employees';
import MyModal from './MyModal';
import Employee from './Employee';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
// import { TableFooter } from '@material-ui/core';
// import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';

import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


export default function ReactTable({caption, employees}) {
  const classes = useStyles();
  
  const [initialState, setInitialSate] = useState({ 
    pageSize: 50, 
    hiddenColumns: [ 'id', 'color' ], 
    sortBy: [{ id: 'id', desc: false }]
  });

  const columns = useMemo(() =>  EMPLOYEES, []);
  const data = useMemo(() => employees, [employees]);
  
  const tableHooks = useTable(
    { columns, data, initialState }, 
    useSortBy, 
    usePagination
  );

  const {getTableProps, state } = tableHooks;

  const { pageIndex, pageSize }  = state;

  return (<>
  
  <Paper className={classes.paper}>
    <TableContainer>
      <Table
        {...getTableProps()}
        size='small'
        className={classes.table}
        // aria-labelledby="tableTitle"
      >
        <THead tHooks={tableHooks} caption={caption}/>
        {TBody(tableHooks,employees)}
      </Table>
    </TableContainer>
    {TFoot(tableHooks,setInitialSate,pageIndex,pageSize)}
  </Paper>
  </>)  
}

function THead( props ) {
  const  { tHooks , caption } = props;
  const { headerGroups } = tHooks;
  const classes = useStyles();
  return <TableHead>
    <TableRow>    
      <TableCell colSpan={2} style={{textAlign: 'left' }}>        
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {caption}
        </Typography>
      </TableCell>
      <TableCell colSpan={6} padding='none' style={{textAlign: 'right' }}>
        <MyModal><Employee/></MyModal>
      </TableCell>              
    </TableRow>
    {headerGroups.map((headerGroup, idx) => (
      <TableRow {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => (
          <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>            
            {column.render('Header')}
            {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
          </TableCell>
        ))}
        <TableCell> 
        </TableCell>  
      </TableRow>
    ))}
  </TableHead>
 }

function TBody({page,prepareRow,getTableBodyProps},employees) {
  return <TableBody {...getTableBodyProps()}>
    {page.map(row => {
    prepareRow(row)
    return (
      <TableRow {...row.getRowProps()}  hover>
      {/* <tr {...row.getRowProps()} onClick={ () => <CreateModal />}> */}
        {
          row.cells.map(cell => (
            <TableCell size='small' {...cell.getCellProps()}>
              {cell.render('Cell')}
            </TableCell>
          ))
        }
        <TableCell align="right" padding='none'>
          <MyModal edit={true} >
            <Employee data={employees[row.id]} />
          </MyModal>
          </TableCell>
      </TableRow>
      
    )
    })}
  </TableBody> 
}

function TFoot({allColumns,pageOptions,setPageSize,gotoPage,canNextPage,canPreviousPage,nextPage,pageCount,previousPage },setInitialSate,pageIndex,pageSize) {
  return(<div align='center'>
      <span align='center' >Page{' '}{pageIndex + 1} of {pageOptions.length}{' '}</span>
      <span>| Go to page: {' '}
        <input type='number' min="1" max={pageOptions.length} defaultValue={pageIndex + 1} 
          onChange={ e => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber)
          }}
          style={{width: '32px'}} 
        />
        <select 
          value={pageSize}
          onChange={(e)=> {setPageSize(Number(e.target.value)); setInitialSate(prev=>({...prev,pageSize: e.target.value}) ) }}
          style={{width: '80px'}} 
        >
          {[5,10,25,50].map(pageSize => <option key={pageSize} value={pageSize}>Show {pageSize}</option>)}
        </select>
        {' '}
      </span>
      <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
      <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
      <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
      <button onClick={()=>gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      <br />
      <span><strong>COLUMNS:</strong></span>
      {allColumns.map(column => 
        <span key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()}/>            
            {column.Header}
          </label>
        </span>
      )}
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pageOptions.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={(e,p) => gotoPage(Number(p))}
          onChangeRowsPerPage={e => setPageSize(Number(e.target.value))}
        /> */}
    </div>)
}