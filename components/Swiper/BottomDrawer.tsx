import { Animated, Dimensions, PanResponder, GestureResponderEvent, PanResponderGestureState, View, Text } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { DrawerState } from "./DrawerState"
import { animateMove, getNextState } from "./AnimateHelper"
import { HorizontalLine } from "./HorizontalLine";
import { CourseList } from "./CourseViews/CourseList";
import { CourseType } from "./CourseViews/CourseType";

type BottomDrawerProps = {
    courses: Array<CourseType>,
    name: string
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
    courses,
    name
}) => {
    const { height } = Dimensions.get("window");
    /* Declare initial value of y. In this case, we want it to be closed when the component is closed */
    const y = React.useRef(new Animated.Value(DrawerState.Closed)).current;
    /* Declare another variable to keep track of the state. We need a separate variable for this because 
        y will also change whilst the user is in the process of moving the drawer up or down */
    // const state = React.useRef(new Animated.Value(DrawerState.Closed)).current;
    const [state, setState] = useState(new Animated.Value(DrawerState.Closed));
    const margin = 0.05 * height;
    const movementValue = (moveY: number) => height - moveY;

    /* This event is triggered when the animated view is moving. We want the user to be able to 
    drag/swipe up or down and the drawer should move simultaneously. */
    const onPanResponderMove = (
        _: GestureResponderEvent, 
        { moveY }: PanResponderGestureState
    ) => {
        const val = movementValue(moveY);
        animateMove(y, val);
    }

    /* Here is where we snap the drawer to the desired state - open, peek or closed */
    const onPanResponderRelease = (
        _: GestureResponderEvent, 
        { moveY }: PanResponderGestureState
    ) => {
        const valueToMove = movementValue(moveY);
        const nextState = getNextState((state as any)._value, valueToMove, margin);
        // state.setValue(nextState);
        setState(new Animated.Value(nextState));
        animateMove(y, nextState);
    }

    /* This determines if the responder should do something. In this scenario, 
        it is set to true when the distance moved by Y is greater than or 
        equal to 10, or lesser than or equal to -10. */
    const onMoveShouldSetPanResponder = (
        _: GestureResponderEvent, 
        { dy }: PanResponderGestureState
    ): boolean => {
        return Math.abs(dy) >= 10;
    }

    /* This determines if the responder should do something. In this scenario, it is set to true 
        when the distance moved by Y is greater than or equal to 10, or lesser than or equal to -10. */
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder,
            onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
            onPanResponderMove,
            onPanResponderRelease
        }),
    ).current;

    return (
        <Animated.View
            style={[{
                width: '100%',
                height: height,
                backgroundColor: '#fff',
                borderRadius: 25,
                position: 'absolute',
                bottom: -height + 30,
                /* Refers to y variable which changes as the user performs a gesture */
                transform: [{ translateY: y}]
            }]}
            /* Refers to the PanResponder created above */
            {...panResponder.panHandlers} >
            <HorizontalLine />
            {
                <CourseList courses={courses} drawerState={(state as any)._value} />
            }
        </Animated.View>
    );
}

export default BottomDrawer;