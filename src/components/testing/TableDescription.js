import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Row = ({ data }) => (
  <TableRow key={data.uuid}>
    <TableCell component="th" scope="row"> {data.uuid} </TableCell>
    <TableCell align="left">{data.description}</TableCell>
  </TableRow>
);

function TableDescription(props) {
  const classes = useStyles();
  const { list } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>uuid</TableCell>
            <TableCell align="left">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => {return (<Row data={row}/>)})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableDescription.propTypes = {
  list: PropTypes.array.isRequired,
};

export default TableDescription;