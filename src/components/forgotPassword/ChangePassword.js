import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StepContext, steps } from './ActiveAccount';
import {
  CssBaseline,
  Typography,
  Button,
  Box,
  TextField,
} from '@material-ui/core';
import { STYLE } from '../../index.style';
import { AlertTitle, Alert } from '@material-ui/lab';
import { changePasswordWithToken } from '../../redux/actions/session';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import findRoute from '../../routing';

const ChangePassword = ({ actions }) => {
  const { changePasswordWithToken } = actions;
  const { setStep, phone, token } = useContext(StepContext);
  const classes = STYLE();
  const [errorDescription, setErrorDescription] = useState('');
  const defaultErrors = { password: [] };
  const [errors, setErrors] = useState(defaultErrors);
  const history = useHistory();
  const defaultData = {
    password: '',
    match_password: '',
  };
  const [data, setData] = useState(defaultData);

  const submit = useCallback(
    (event) => {
      event.preventDefault();

      setErrorDescription('');

      if (data.password !== data.match_password) {
        setErrorDescription('password and match password are not equal.');

        return;
      }

      const formData = new FormData(event.currentTarget);

      formData.append('phoneNumber', phone);
      formData.append('token', token);
      changePasswordWithToken(formData)
        .then((response) => {
          setErrors(defaultErrors);
          setData(defaultData);

          history.push(findRoute('home').path);
        })
        .catch((error) => {
          if (!error.isAxiosError) {
            setErrorDescription('Ups!! something was wrong.');

            throw error;
          }

          setErrors({ ...defaultErrors, ...error.response.data.errors });

          throw error;
        });
    },
    [
      data,
      setErrorDescription,
      phone,
      token,
      changePasswordWithToken,
      setErrors,
      defaultErrors,
      history,
      defaultData,
    ]
  );

  useEffect(() => {
    if (!phone || !token) {
      setStep(steps.requestToken);
    }
  }, [phone, token, setStep]);

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant='h4'>Change password</Typography>
        <form
          className={classes.form}
          onSubmit={submit}
          noValidate
          method='post'>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='password'
            name='password'
            type='text'
            error={errors.password.length > 0}
            helperText={errors.password.length ? errors.password[0] : ''}
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='match_password'
            name='match_password'
            type='text'
            value={data.match_password}
            onChange={(e) => {
              setData({ ...data, match_password: e.target.value });
            }}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Change password
          </Button>
        </form>
        <Box component='div' hidden={errorDescription.length <= 0}>
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            {errorDescription}
          </Alert>
        </Box>
      </div>
    </>
  );
};

const mapProps = (state) => ({});

const mapActions = (dispatch) => {
  return {
    actions: {
      changePasswordWithToken: bindActionCreators(
        changePasswordWithToken,
        dispatch
      ),
    },
  };
};

export default connect(mapProps, mapActions)(ChangePassword);
