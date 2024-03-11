import React, { useEffect } from 'react';
import Avatar from 'react-avatar';

const Client = ({ user,  firstName }) => {

  return (
    <div className="flex flex-col items-center justify-center">
      <Avatar name={firstName} size={60} round="14px" />
      <span className="userName text-white">{`${firstName}`}</span>
    </div>
  );
};

export default Client;
