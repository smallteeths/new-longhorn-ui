import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export default function LinkTo({ to, children, ...props }) {
  return (
    <Link to={{ pathname: to.pathname }} {...props}>{children}</Link>
  )
}

LinkTo.propTypes = {
  to: PropTypes.object,
  children: PropTypes.any,
}