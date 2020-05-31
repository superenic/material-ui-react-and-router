import React, { useCallback, useState, useEffect } from 'react';
import {
  Container,
  CssBaseline,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Box,
  IconButton,
  Typography,
} from '@material-ui/core';
import { STYLE } from '../../index.style';
import { connect } from 'react-redux';
import { WEB_LOADED } from '../../redux/actions/actionsType';
import findRoute from '../../routing';
import {
  sendMultifactoAuthentification,
  activeMultifactorAuthentification,
  verificarToken,
} from '../../redux/actions/session';
import { bindActionCreators } from 'redux';
import { Alert, AlertTitle } from '@material-ui/lab';

const ForgotPassword = ({ actions, webLoad }) => {
  const { sendMultifactoAuthentification } = actions;
  const classes = STYLE();
  const [isSentToken, setIsSentToken] = useState(false);
  const [errorDescription, setErrorDescription] = useState('');
  const [data, setData] = useState({ phone: '', token: '' });
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
          })
          .catch((error) => {
            let message = error.response.data.errors.celular[0];
            if (error.response.data.errors.celular[0])
              setErrorDescription(message);
            else setErrorDescription(error.response.message);
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
    ]
  );
  useEffect(() => {
    if (!isSentToken) {
      setData({ phone: '', token: '' });
    }
  }, [isSentToken, setData]);

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box component='div'>
          <IconButton aria-label='delete' href={findRoute('home').path}>
            go back
          </IconButton>
        </Box>
        <div className={classes.paper}>
          <Typography variant='h4'>
            {isSentToken
              ? 'Token was sent'
              : 'Recovery password or active count'}
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
                type='number'
                value={data.phone}
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
                value={data.token}
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
      </Container>
      <Backdrop className={classes.backdrop} open={webLoad !== WEB_LOADED}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
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
