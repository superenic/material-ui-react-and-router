import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { bindActionCreators } from 'redux';
import { listRemove } from "./reducers/descriptionAction";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Row = ({ data, actions }) => {
  const { listRemove } = actions;
  const deleteRow = useCallback((row) => (e) => {
    listRemove(row);

    console.log('deleted a row');
  }, [listRemove]);

  return (
    <TableRow key={data.uuid}>
      <TableCell component="th" scope="row"> {data.uuid} </TableCell>
      <TableCell align="left">{data.description}</TableCell>
      <TableCell align="left">
        <IconButton aria-label="delete" onClick={deleteRow(data)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

function TableDescription({list, actions}) {
  const classes = useStyles();

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
          {list.map((row) => {return (<Row key={row.uuid} data={row} actions={actions}/>)})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableDescription.propTypes = {
  list: PropTypes.array.isRequired,
};

const mapProps = (state) => ({});

const mapAction = (dispatch) => ({
    actions: {
      listRemove: bindActionCreators(listRemove, dispatch)
    }
});


export default connect(mapProps, mapAction)(TableDescription);