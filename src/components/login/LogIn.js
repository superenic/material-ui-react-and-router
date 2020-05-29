import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { openSession } from '../../redux/actions/session';
import { Backdrop, CircularProgress, Box } from '@material-ui/core';
import { STYLE } from "../../index.style";
import { WEB_LOADED } from '../../redux/actions/actionsType';


const LogIn = ({actions, webLoad, session}) => {
  const classes = STYLE();
  const {openSession} = actions;
  const [errorDescription, setErrorDescription] = useState('');
  const sumbit = useCallback(
    (htmlFormElement) => {
      htmlFormElement.preventDefault();
      const element = htmlFormElement.currentTarget;
      let formData = new FormData(htmlFormElement.currentTarget);
      let rememberToken = formData.get('remember_token');

      openSession(formData)
        .then((request) => {
          setErrorDescription('');

          element.reset();

          const {localStorage} = window;
          if ( localStorage && rememberToken )
            localStorage.setItem('session', JSON.stringify(request.data));

          return request;
        })
        .catch((error) => {
          debugger;
          const { status, statusText } = error.response;

          switch (status) {
            case 401:
              setErrorDescription('invalid user and password');
              break;

            default:
              setErrorDescription(statusText);
              break;
          }
        });
    },
    [openSession]
  );

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={sumbit} method="post">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="username"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" name="remember_token" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box component="div" hidden={errorDescription.length <= 0}>
          <Alert severity="error" display="none">
            <AlertTitle>Error</AlertTitle>
            {errorDescription}
          </Alert>
        </Box>
      </Container>
      <Backdrop className={classes.backdrop} open={ (webLoad !== WEB_LOADED) }>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

const mapsProps = (state) => {
  return {
    session: state.session,
    webLoad: state.webLoad,
  }
};

const mapsActions = (dispatch) => {
  return {
    actions: {
      openSession: bindActionCreators(openSession, dispatch)
    }
  }
}

export default connect(mapsProps, mapsActions)(LogIn);