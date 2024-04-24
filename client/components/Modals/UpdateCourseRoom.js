import { Button, Input, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateCourseRoom = ({
  onClose,
  courseYearId,
  loadCourseRoom,
  currentRoom,
  setCurrentRoom,
  courseLevel
}) => {
    const handleUpdateRoom = async (e) => {
        if (!currentRoom.roomName.trim()) {
            toast.error("กรุณากรอกชื่อห้องเรียน");
            return;
        }

        try {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/courseRoom/${currentRoom._id}`,
                currentRoom
            );
            onClose()
            loadCourseRoom();
            toast.success("แก้ไขห้องเรียนสำเร็จ");
        } catch (error) {
            console.error(error); // Handle any errors that may occur during the deletion process
            toast.error("ไม่สามารถแก้ไขห้องเรียนได้");
        }
    };
  return (
    <div>
      <ModalHeader className="flex flex-col gap-1">แก้ไขห้องเรียน</ModalHeader>
      <ModalBody>
        <div className="flex w-full md:flex-nowrap gap-4">
          <div className="w-1/2">
            <Input
              isDisabled
              value={`มัธยมศึกษาปีที่ ${courseLevel}`}
              variant="bordered"
            />
          </div>

          <div>
            <Input
              maxLength={2}
              autoFocus
              value={currentRoom.roomName}
              onChange={(e) =>
                setCurrentRoom({ ...currentRoom, roomName: e.target.value })
              }
              placeholder="เช่น ม.1/1"
              variant="bordered"
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {currentRoom.roomName.length}/2
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          ยกเลิก
        </Button>
        <Button onClick={handleUpdateRoom} color="primary">
          ยืนยัน
        </Button>
      </ModalFooter>
    </div>
  );
};

export default UpdateCourseRoom;
