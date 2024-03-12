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
                    maxLength={10}
                    autoFocus
                    value={currentRoom.roomName}
                    onChange={(e) => setCurrentRoom({ ...currentRoom, roomName: e.target.value })}

                    placeholder="เช่น ม.1/1"
                    variant="bordered"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                    {currentRoom.roomName.length}/10
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={handleUpdateRoom} color="primary" >
                    ยืนยัน
                </Button>
            </ModalFooter>
        </div>
    )
}

export default UpdateCourseRoom