import { Avatar, Button } from '@nextui-org/react';
import React, { useEffect } from 'react';

const Client = ({ user, userData }) => {
    const isCurrentUser = userData && user && userData._id === user._id;

    return (
        <div className="flex flex-col space-y-2 items-center justify-center mt-2">
            <Avatar
                isBordered
                radius="sm"
                name={`${user.firstName} ${user.lastName}`}
                size='lg'
                src={user.image ? user.image : undefined}
            />
            <span className="userName text-white">
                {`${user.firstName} ${user.lastName}`} {isCurrentUser ? "(ฉัน)" : ""}
            </span>
        </div>
    );
};

export default Client;
