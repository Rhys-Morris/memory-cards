import React from "react";
import PropTypes from 'prop-types';

export default function Card({ html, onClick }) {
  return <img onClick={onClick} className="card" src={html} />;
}

Card.propTypes = {
  html: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}