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
    timeConflictCourse: CourseType
}

const LectureOnHold: React.FC<LectureOnHoldProps> = ({
    navigation,
    route
}) => {
    let { courseToAdd, noTimeConflict, timeConflictCourse }: LectureOnHoldRouteParamProps = route.params;
    console.log("lec: ", courseToAdd.CRN);
    return (   
            noTimeConflict 
                ? <LectureHoldSuccess course={courseToAdd} navigation={navigation} /> 
                : <RemoveWarning courseToAdd={courseToAdd} 
                    timeConflictCourse={timeConflictCourse}
                    navigation={navigation} /> 
    );
}

export default LectureOnHold