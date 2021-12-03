import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './components/ProfileScreen';
import CourseDetail from './components/CourseDetail';
import LectureOnHold from './components/LectureHold/LectureOnHold';
import LinkedSectionDetails from './components/LinkedCourses/LinkedSectionDetails';
import { LabOnHold }  from './components/LinkedCourses/LabCourses/LabOnHold';
import RemoveAllSuccess from './components/LinkedCourses/RemoveAllSuccess';
import { DiscussionOnHold } from './components/LinkedCourses/DiscussionCourses/DiscussionOnHold';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: 'Welcome Student' }}
        />
        <Stack.Screen name="CourseDetail" component={CourseDetail} />
        <Stack.Screen name="LectureOnHold" component={LectureOnHold} />
        <Stack.Screen name="LinkedSectionDetails" component={LinkedSectionDetails} />
        <Stack.Screen name="DiscussionOnHold" component={DiscussionOnHold} />
        <Stack.Screen name="LabOnHold" component={LabOnHold} />
        <Stack.Screen name="RemoveAllSuccess" component={RemoveAllSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;