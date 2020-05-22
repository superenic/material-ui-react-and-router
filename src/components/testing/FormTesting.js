import React from 'react'
import { STYLE } from "../../index.style";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TableDescription from './TableDescription';
import { connect } from 'react-redux';
import * as actions from '../testing/reducers/descriptionAction'
import { bindActionCreators } from 'redux';

const FormTesting = ({ actions, listReducer }) => {
    const classes = STYLE();

    let onSubmit = (e) => {
        e.preventDefault();

        /** @var {ElementNode} form */
        let form = e.target;
        let data = new FormData(form);
        let description = data.get('description');

        actions.addDescription(description);

        form.querySelector('input[name="description"]').value = '';
    };

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField 
                    label="Descripcion" 
                    variant="filled" 
                    fullWidth 
                    name="description"
                    placeholder="Create a new row."/>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={ classes.button }
                        startIcon={ <SaveIcon /> }
                    >
                        Save
                    </Button>
            </form>
            <TableDescription list={ listReducer } />
        </>
    )
}

const mapProp = (state) => {
    const { listReducer } = state;
    return {
        listReducer,
    }
};

const mapActions = (dispatch) => {
    return {
        actions: {
            addDescription: bindActionCreators(actions.listAdd, dispatch),
            listDescription: bindActionCreators(actions.getList, dispatch),
            removeDescription: bindActionCreators(actions.listRemove, dispatch),
        }
    };
}

export default connect(mapProp, mapActions)(FormTesting);