import React from "react";
import "./Spinner.css";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const Spinner = (props) => {
  const { component, loadings } = props;
  return (
    ( loadings > 0 || component === undefined ?
        <div className="loader">Loading...</div>
      :
        <component />
    )
  );
};

Spinner.prototype = {
  component: PropTypes.element,
};

const mapProps = (state) => {
  const { loadings } = state;

  return {
    loadings,
  };
}

export default connect(mapProps)(Spinner);
