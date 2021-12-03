import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './components/ProfileScreen';
import CourseDetail from './components/CourseDetail';
import LectureOnHold from './components/LectureHold/LectureOnHold';
import DiscussionDetail from './components/LinkedCourses/DiscussionDetail';
import LabOnHold  from './components/LinkedCourses/LabOnHold';
import RemoveAllSuccess from './components/LinkedCourses/RemoveAllSuccess';

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
        <Stack.Screen name="DiscussionDetail" component={DiscussionDetail} />
        <Stack.Screen name="LabOnHold" component={LabOnHold} />
        <Stack.Screen name="RemoveAllSuccess" component={RemoveAllSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;