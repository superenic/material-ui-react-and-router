import React, { useState, createContext } from 'react';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import {
  Box,
  IconButton,
  Container,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import findRoute from '../../routing';
import { connect } from 'react-redux';
import { WEB_LOADED } from '../../redux/actions/actionsType';
import { STYLE } from '../../index.style';

export const steps = {
  requestToken: 1,
  changePassword: 2,
  activeAccount: 3,
  succesActions: 4,
};

export const StepContext = createContext();

const ActiveAccount = ({ webLoad }) => {
  const [step, setStep] = useState(steps.requestToken);
  const [phone, setPhone] = useState(null);
  const [token, setToken] = useState(null);
  const provider = { setStep, setPhone, setToken, phone, token };
  const classes = STYLE();

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box component='div'>
          <IconButton aria-label='delete' href={findRoute('home').path}>
            go back
          </IconButton>
        </Box>
        <StepContext.Provider value={provider}>
          {step === steps.requestToken && <ForgotPassword />}
          {step === steps.changePassword && <ChangePassword />}
          {/** TODO: Active account withouth/with model */}
          {step === steps.activeAccount && 'This account is not ready yet...'}
        </StepContext.Provider>
      </Container>
      <Backdrop className={classes.backdrop} open={webLoad !== WEB_LOADED}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

const mapProps = (state) => {
  return {
    webLoad: state.webLoad,
  };
};
export default connect(mapProps)(ActiveAccount);
