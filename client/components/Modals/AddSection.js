import { Button, Input, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'

const AddSection = ({
    handleAddSection,
    onClose
}) => {
    const [sectionName, setSectionName] = useState('');

    const handleSaveSection = () => {
        if (sectionName.length === 0) {
            toast.error("กรุณากรอกชื่อบทเรียน");
            return;
        }
        if (sectionName.length > 100) {
            toast.error("ชื่อบทเรียนต้องมีความยาวไม่เกิน 100 ตัวอักษร");
            return;
        }

        // If the section name length is valid, call the handleAddSection function
        handleAddSection(sectionName);
    };

    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">สร้างบทเรียน</ModalHeader>
            <ModalBody>
                <Input
                    autoFocus
                    placeholder="ชื่อบทเรียน"
                    variant="bordered"
                    focus={{ borderColor: 'primary' }}
                    value={sectionName}
                    name='sectionName'
                    onChange={(e) => {
                        if (e.target.value.length <= 100) {
                            setSectionName(e.target.value);
                        }
                    }}
                    style={{ fontSize: '18px' }}
                    maxLength={100} 
                />

                <div className="ml-auto flex  space-x-4 mt-1">
                    <p className="text-gray-500 text-sm">{sectionName.length}/100</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={handleSaveSection} color="primary" >
                    บันทึก
                </Button>
            </ModalFooter>
        </div>
    )
}

export default AddSection;
