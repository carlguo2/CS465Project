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
    timeConflictCourse: CourseType,
    courseList: Array<CourseType>
}

const LectureOnHold: React.FC<LectureOnHoldProps> = ({
    navigation,
    route
}) => {
    let { courseToAdd, noTimeConflict, timeConflictCourse, courseList }: LectureOnHoldRouteParamProps = route.params;
    return (   
            noTimeConflict 
                ? <LectureHoldSuccess 
                    courseToAdd={courseToAdd} 
                    navigation={navigation}
                    courseList={courseList} /> 
                : <RemoveWarning 
                    courseToAdd={courseToAdd} 
                    timeConflictCourse={timeConflictCourse}
                    navigation={navigation}
                    courseList={courseList} /> 
    );
}

export default LectureOnHold