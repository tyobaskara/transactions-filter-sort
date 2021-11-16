import React from 'react'

import config from './statusLabel.component.config';

import './statusLabel.styles.scss';

const PendingStatus = () => (
  <span className='status status--pending'>Pengecekan</span>
);

const SuccessStatus = () => (
  <span className='status status--success'>Berhasil</span>
);

const StatusLabel = (props) => {
  const { status } = props;

  return status === 'PENDING' ? <PendingStatus/> : <SuccessStatus />
};
StatusLabel.displayName = config.displayName;
StatusLabel.propTypes = config.propTypes;
StatusLabel.defaultProps = config.defaultProps;

export default StatusLabel;
