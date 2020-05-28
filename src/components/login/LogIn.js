import React, { useCallback, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { openSession } from '../../redux/actions/session';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { STYLE } from "../../index.style";
import { WEB_LOADED } from '../../redux/actions/actionsType';


const LogIn = ({actions, webLoad}) => {
  const classes = STYLE();
  const {openSession} = actions;
  const sumbit = useCallback(
    (e) => {
      e.preventDefault();

      let formData = new FormData(e.currentTarget);
      openSession(formData)
        .then((request) => {debugger;})
        .catch((eror) => {debugger;});
    },
    []
  );

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate onSubmit={sumbit} method="post">
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
              control={<Checkbox value="remember" color="primary" />}
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