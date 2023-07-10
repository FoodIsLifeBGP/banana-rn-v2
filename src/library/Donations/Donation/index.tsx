import React from 'react';
import Donation from './Donation';

function WrappedDonation(props) {
  return <Donation {...props} donation={props.donation.donation} />;
}

export default WrappedDonation;
