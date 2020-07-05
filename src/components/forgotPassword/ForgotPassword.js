import React, { useCallback, useState, useEffect, useContext } from 'react';
import {
  CssBaseline,
  TextField,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { STYLE } from '../../index.style';
import { connect } from 'react-redux';
import {
  sendMultifactoAuthentification,
  activeMultifactorAuthentification,
  verificarToken,
} from '../../redux/actions/session';
import { bindActionCreators } from 'redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { StepContext } from './ActiveAccount';
import { steps } from './ActiveAccount';

const ForgotPassword = ({ actions, webLoad }) => {
  const { setStep, setPhone, setToken } = useContext(StepContext);
  const { sendMultifactoAuthentification, verificarToken } = actions;
  const classes = STYLE();
  const [isSentToken, setIsSentToken] = useState(false);
  const [errorDescription, setErrorDescription] = useState('');
  const defaultData = { phone: '', token: '' };
  const [data, setData] = useState(defaultData);
  const submit = useCallback(
    (formEvent) => {
      formEvent.preventDefault();

      const element = formEvent.currentTarget;
      const formData = new FormData(element);

      if (isSentToken) {
        verificarToken(formData)
          .then((response) => {
            setIsSentToken(true);
            setErrorDescription('');
            setPhone(data.phone);
            setToken(data.token);
            setStep(
              response.data.usuario_existe === '1'
                ? steps.changePassword
                : steps.activeAccount
            );

            return response;
          })
          .catch((error) => {
            if (!error.isAxiosError) {
              console.error(error);

              setErrorDescription('Ooops something was wrong!');

              throw error;
            }

            let message = error.response.data.errors.celular[0];
            if (error.response.data.errors.celular[0])
              setErrorDescription(message);
            else {
              setErrorDescription(error.response.message);
            }

            throw error;
          });
      } else {
        sendMultifactoAuthentification(formData)
          .then((response) => {
            setIsSentToken(true);
            setErrorDescription('');
          })
          .catch((error) => {
            let message = error.response.data.errors.celular[0];
            if (error.response.data.errors.celular[0])
              setErrorDescription(message);
            else setErrorDescription(error.response.message);
          });
      }
    },
    [
      sendMultifactoAuthentification,
      isSentToken,
      setIsSentToken,
      setErrorDescription,
      setStep,
      verificarToken,
      setToken,
      data,
      setPhone,
    ]
  );
  useEffect(() => {
    if (!isSentToken) {
      setData(defaultData);
    }
  }, [isSentToken, defaultData]);

  const sendVerificationForm = (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant='h4'>
          {isSentToken ? 'Token was sent' : 'Recovery password or active count'}
        </Typography>
        <form
          className={classes.form}
          onSubmit={submit}
          noValidate
          method='post'>
          <Box hidden={isSentToken}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='phone number'
              name='phoneNumber'
              type='text'
              defaultValue={data.phone}
              onChange={(e) => {
                setData({ ...data, phone: e.target.value });
              }}
            />
          </Box>
          <Box hidden={!isSentToken}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='verification token'
              name='verificationToken'
              type='text'
              defaultValue={data.token}
              onChange={(e) => {
                setData({ ...data, token: e.target.value });
              }}
            />
          </Box>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            {isSentToken ? 'validate token' : 'Send validation token'}
          </Button>
          <Box hidden={!isSentToken} style={{ textAlign: 'center' }}>
            <Button onClick={() => setIsSentToken(false)}>
              Send token again
            </Button>
          </Box>
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

  return <>{sendVerificationForm}</>;
};

const mapsProps = (state) => {
  return {
    session: state.session,
    webLoad: state.webLoad,
  };
};

const mapsActions = (dispatch) => {
  return {
    actions: {
      sendMultifactoAuthentification: bindActionCreators(
        sendMultifactoAuthentification,
        dispatch
      ),
      activeMultifactorAuthentification: bindActionCreators(
        activeMultifactorAuthentification,
        dispatch
      ),
      verificarToken: bindActionCreators(verificarToken, dispatch),
    },
  };
};

export default connect(mapsProps, mapsActions)(ForgotPassword);
