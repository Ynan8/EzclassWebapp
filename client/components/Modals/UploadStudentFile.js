import { ModalBody, ModalFooter, ModalHeader, Button } from '@nextui-org/react'
import React, { useRef, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai';
import { FaCloudUploadAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import axios from 'axios';
import toast from 'react-hot-toast';

const UploadStudentFile = ({
    onClose,
    courseRoomId,
    loadStudentCourse,
}) => {
    const [uploadButtonText, setUploadButtonText] = useState('อัพโหลดไฟล์');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setUploadButtonText(file.name);
    
        if (!file) {
            return;
        }
    
        setLoading(true);
    
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
    
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
    
    
                setStudents(jsonData); 
                setLoading(false);
            } catch (error) {
                console.error('Error parsing Excel file:', error);
                toast.error('Error parsing Excel file. Please check the file format.');
                setLoading(false);
            }
        };
    
        reader.readAsArrayBuffer(file);
    };
    
    const importStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/import-students/${courseRoomId}`, { students });
            console.log(response.data);

            const existingStudentsUpdated = response.data.students.some((student) => student.message === 'Existing student updated');

            if (existingStudentsUpdated) {
                toast.error('Existing students were updated.');
            } else {
                toast.success('เพิ่มนักเรียนสำเร็จ');
                onClose(); // Close the modal after successful import
            }
            loadStudentCourse()
            setLoading(false);
        } catch (error) {
            console.error('Error importing students:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">Import Excel</ModalHeader>
            <ModalBody>
                <p className="text-center text-lg font-semibold mb-4">รายชื่อนักเรียนที่จะถูกเพิ่ม</p>
                <div className="mt-4">
                    <table className="w-full ">
                        <thead>
                            <tr className="text-lg font-medium border-b border-gray-200">
                                <td className="py-1 px-4 text-center">รหัสนักเรียน</td>
                                <td className="py-1 px-4 text-center">ชื่อจริง</td>
                                <td className="py-1 px-4 text-center">นามสกุล</td>
                            </tr>
                        </thead>
                        {students.length > 0 && (
                            <tbody className="text-lg">
                                {students.map((student, index) => (
                                    <tr key={index} className="h-10 transition-colors group">
                                        <td className="text-center py-3">{student.รหัสนักเรียน}</td>
                                        <td className="text-center py-3">{student.ชื่อจริง}</td>
                                        <td className="text-center py-3">{student.นามสกุล}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
                {students.length === 0 && (
                    <div className="flex flex-col text-center item-center justify-center my-20">
                        <p className='text-lg' >
                            ยังไม่มีข้อมูลนักเรียน กรุณาอัปโหลดไฟล์ Excel ที่ปุ่ม{' '}
                            <span className='text-blue-500 '>อัพโหลดไฟล์</span>
                        </p>
                    </div>
                )}
                <div className="flex justify-center items-center mt-4">
                    <Button
                        color="default"
                        variant="bordered"
                        startContent={<FaCloudUploadAlt size={25} />}
                        onClick={() => fileInputRef.current.click()}
                    >
                        {uploadButtonText}
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button color="primary" onPress={importStudents} disabled={loading || students.length === 0}>
                    ยืนยัน
                </Button>
            </ModalFooter>
        </div>
    )
}

export default UploadStudentFile;
