import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Button } from "@nextui-org/react";
import { useRouter } from 'next/router';
import axios from 'axios';

const JoinRoom = ({
    isOpen,
    onOpenChange,
    handleStartLearning,
    handleToRoom,
}) => {
    const [codeJoin, setCodeJoin] = useState('');
    const router = useRouter();

   

    const handleJoin = () => {
        // Join the room with the password
        handleToRoom (codeJoin, codeJoin)();
        onOpenChange(false); // Close the modal
    };

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">รหัสเข้าร่วมห้องเรียนเขียนโค้ด</ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            placeholder='กรอกรหัสเข้าร่วม'
                            variant="bordered"
                            className="w-full"
                            value={codeJoin}
                            onChange={(e) => setCodeJoin(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
                            ยกเลิก
                        </Button>
                        <Button color="primary" onClick={handleJoin}>
                            เข้าร่วม
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default JoinRoom;
