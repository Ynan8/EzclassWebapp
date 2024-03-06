import { Button, Input, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";

const UpdateCourseRoom = ({
    onClose,
    courseYearId,
    loadCourseRoom,
    currentRoom,
    setCurrentRoom,
    handleUpdateRoom

}) => {


    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">แก้ไขห้องเรียน</ModalHeader>
            <ModalBody>
                <Input
                    autoFocus
                    value={currentRoom.roomName}
                    onChange={(e) => setCurrentRoom({ ...currentRoom, roomName: e.target.value })}

                    placeholder="เช่น ม.1/1"
                    variant="bordered"
                />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={handleUpdateRoom} color="primary" onPress={onClose}>
                    ยืนยัน
                </Button>
            </ModalFooter>
        </div>
    )
}

export default UpdateCourseRoom