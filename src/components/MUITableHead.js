import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MyModal from './MyModal';
import Employee from './Employee';

const headCells = [
  { id: 'code', numeric: false, disablePadding: false, label: 'CODE' },
  { id: 'first_name', numeric: false, disablePadding: false, label: 'NAME' },
  { id: 'profession', numeric: false, disablePadding: false, label: 'PROFESSION' },
  { id: 'city', numeric: false, disablePadding: false, label: 'CITY' },
  { id: 'branch', numeric: false, disablePadding: false, label: 'BRANCH' },
];

MUITableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  orderByID: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
};

export default function MUITableHead(props) {

  const { classes, order, orderBy, orderByID, onRequestSort, caption } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>    
        <TableCell colSpan={6} style={{textAlign: 'left' }}>        
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {caption}
          </Typography>
        </TableCell>
        <TableCell colSpan={1}  padding='none' style={{textAlign: 'right' }}>
          <MyModal><Employee/></MyModal>
        </TableCell>         
      </TableRow>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        <TableCell padding='none' align='center'><IconButton onClick={orderByID} ></IconButton> </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align='right' padding='none'>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
