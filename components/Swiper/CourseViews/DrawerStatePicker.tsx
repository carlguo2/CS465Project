import React from "react"
import { DrawerState } from "../DrawerState";
import { CourseOpenView } from "./CourseOpenView";
import { CoursePeekView } from "./CoursePeekView";
import { CourseType } from "./CourseType";

interface DrawerStatePickerProps {
    courses: Array<CourseType>,
    drawerState: any,
    removeCourseFromSchedule: (CourseType) => void
}

export const DrawerStatePicker: React.FC<DrawerStatePickerProps> = ({
    courses, 
    removeCourseFromSchedule,
    drawerState
}) => {    
    switch (drawerState) { 
        case DrawerState.Closed:
            return(<></>);
        case DrawerState.Peek:
            return <CoursePeekView 
                        courses={courses} 
                        removeCourseFromSchedule={removeCourseFromSchedule}
                    />
        case DrawerState.Open:
            return (
                <CourseOpenView courses={courses} />
            );  
    }


}

