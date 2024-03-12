import { useRouter } from 'next/router';
import React from 'react'
import SideBarStudent from '../../../../components/Sidebar/SideBarStudent';
import HeaderBarStd from '../../../../components/HeaderBar/HeaderBarStd';

const studentGradeBook = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <SideBarStudent id={id} />
                <HeaderBarStd />
            </div>
        </div>
    )
}

export default studentGradeBook