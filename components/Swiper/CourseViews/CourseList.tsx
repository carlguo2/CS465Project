import React from "react"
import { DrawerState } from "../DrawerState";
import { CourseOpenView } from "./CourseOpenView";
import { CoursePeekView } from "./CoursePeekView";
import { CourseType } from "./CourseType";

interface CourseListProps {
    courses: Array<CourseType>,
    drawerState: any
}

export const CourseList: React.FC<CourseListProps> = ({
    courses, 
    drawerState
}) => {    
    switch (drawerState) { 
        case DrawerState.Closed:
            return(<></>);
        case DrawerState.Peek:
            return <CoursePeekView courses={courses} />
        case DrawerState.Open:
            return (
                <CourseOpenView courses={courses} />
            );  
    }


}

