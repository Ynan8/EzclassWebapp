import { Button, Input, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'

const AddSection = ({
 
    handleAddSection,
    onClose
}) => {
    const [sectionName, setSectionName] = useState('');
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
                    onChange={(e) => setSectionName(e.target.value)}
                />

            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={() => handleAddSection(sectionName)} color="primary" >
                    บันทึก
                </Button>
            </ModalFooter>
        </div >
    )
}

export default AddSection