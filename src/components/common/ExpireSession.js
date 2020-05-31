import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { closeSession } from '../../redux/actions/session';
import { bindActionCreators } from 'redux';

/**
 * TODO: close session automatic by timer.
 */
const ExpireSession = ({ session }) => {
  const { expire_at } = session;

  useEffect(() => {
    const now = moment().utc();
    const end = moment(expire_at);
    const duration = now.diff(end, 'seconds', true);

    console.log(duration);
  }, [expire_at]);

  return <>{/** Expectited a dialog */}</>;
};

const mapsProps = (state) => {
  return {
    session: state.session,
  };
};

const mapsActions = (dispatch) => {
  return {
    actions: {
      closeSession: bindActionCreators(closeSession, dispatch),
    },
  };
};

export default connect(mapsProps, mapsActions)(ExpireSession);
