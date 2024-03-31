import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react';
import Avatar from 'react-avatar';

const Client = (
  {
  firstName ,
  userData
}) => {
  

  return (
    <div className="flex flex-col items-center justify-center">
      <Avatar name={firstName} size={60} round="14px" />
      <span className="userName text-white">{`${firstName}`}</span>
    </div>
  );
};

export default Client;
