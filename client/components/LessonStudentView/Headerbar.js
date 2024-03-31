import { Link } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { AiOutlineLeft, AiOutlineMenu } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdLogout } from "react-icons/md";

const Headerbar = ({
    sidebarCollapsed,
    setSidebarCollapsed,
    markCompleted,
    selectedLesson,
    handleSidebarToggle,
    id
}) => {
    const isMobileScreen = () => window.innerWidth <= 768; // Adjust the value as needed

    // Set sidebarCollapsed based on screen size when component mounts
    useEffect(() => {
        setSidebarCollapsed(isMobileScreen());
    }, []);

    // Update sidebarCollapsed on screen resize
    useEffect(() => {
        const handleResize = () => {
            setSidebarCollapsed(isMobileScreen());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <header className="header bg-white shadow pr-4 h-16 fixed top-0 left-0 w-full z-10">
                <div className="header-content flex items-center justify-between ">
                    <div className="md:hidden flex items-center justify-between p-4 text-white">
                        <AiOutlineMenu
                            size={30}
                            className="text-gray-500"
                            onClick={handleSidebarToggle}
                        />

                    </div>
                    <div className="flex items-center justify-between p-4 text-white">
                        <Link href={`/student/course/lesson/${id}`} >
                            <MdLogout size={25} className="inline-block align-middle mx-2" />
                            {/* <AiOutlineLeft size={25} className="inline-block align-middle mx-2" /> */}
                            กลับบทเรียน
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Headerbar;
