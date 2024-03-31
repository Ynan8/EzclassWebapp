import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Button } from "@nextui-org/react";
import { useRouter } from 'next/router';
import axios from 'axios';

const JoinRoom = ({
    isOpen,
    onOpenChange,
    handleStartLearning,
}) => {
    const [codeJoin, setCodeJoin] = useState('');

    const router = useRouter()
    
    const handleJoin = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/join-room`, { roomId: codeJoin });
            if (response.data.success) {
                // Join the room
                handleStartLearning(codeJoin)();
                onOpenChange(false); // Close the modal
            } else {
                alert('Room not found or unable to join.');
            }
        } catch (error) {
            console.error('Error joining room:', error);
            alert('An error occurred while trying to join the room.');
        }
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
                        <Button
                            color="primary"
                            onClick={handleJoin}
                        >
                            เข้าร่วม
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default JoinRoom;
