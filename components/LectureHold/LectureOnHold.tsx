import React from "react";
import { LectureHoldSuccess } from "./LectureHoldSuccess";
import { RemoveWarning } from "./RemoveWarning";
import { CourseType } from '../Swiper/CourseViews/CourseType';

interface LectureOnHoldProps {
    navigation: any,
    route: any
}

interface LectureOnHoldRouteParamProps {
    courseToAdd: CourseType,
    noTimeConflict: boolean,
    choseDuplicateCourse: boolean,
    conflictCourse: CourseType,
    courseList: Array<CourseType>
}

const LectureOnHold: React.FC<LectureOnHoldProps> = ({
    navigation,
    route
}) => {
    let { 
        courseToAdd, 
        noTimeConflict, 
        choseDuplicateCourse, 
        conflictCourse, 
        courseList 
    }: LectureOnHoldRouteParamProps = route.params;
    return (   
            (noTimeConflict && !choseDuplicateCourse)
                ? <LectureHoldSuccess 
                    courseToAdd={courseToAdd} 
                    navigation={navigation}
                    courseList={courseList} /> 
                : <RemoveWarning 
                    courseToAdd={courseToAdd} 
                    conflictCourse={conflictCourse}
                    navigation={navigation}
                    courseList={courseList} /> 
    );
}

export default LectureOnHold