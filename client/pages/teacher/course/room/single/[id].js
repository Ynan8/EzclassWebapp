import React from 'react'
import { useRouter } from 'next/router';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom';
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher';


const SingleRoom = () => {
    // Show Course Year
    const router = useRouter();
    const { id, courseYearId } = router.query;
    return (
        <div>
            <SidebarTeacherRoom id={id} courseYearId={courseYearId} />
            <HeaderBarTeacher />
        
        </div>
    )
}

export default SingleRoom