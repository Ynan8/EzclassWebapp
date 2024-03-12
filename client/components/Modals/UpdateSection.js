import { Button, Input, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'

const UpdateSection = ({
    currentSection,
    setCurrentSection,
    handleUpdateSection,
    onClose
}) => {
    const [sectionName, setSectionName] = useState('');
    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">แก้ไขบทเรียน</ModalHeader>
            <ModalBody>
                <Input
                    autoFocus
                    placeholder="ชื่อบทเรียน"
                    variant="bordered"
                    focus={{ borderColor: 'primary' }}
                    value={currentSection.sectionName}
                    onChange={(e) => setCurrentSection({ ...currentSection, sectionName: e.target.value })}
                />

            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={handleUpdateSection} color="primary" >
                    บันทึก
                </Button>
            </ModalFooter>
        </div >
    )
}

export default UpdateSection