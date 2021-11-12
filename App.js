import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import ProfileScreen from './components/ProfileScreen';
import CourseDetail from './components/CourseDetail';
import LectureOnHold from './components/LectureOnHold';
import DiscussionDetail from './components/DiscussionDetail';
import LabOnHold  from './components/LabOnHold';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="CourseDetail" component={CourseDetail} />
        <Stack.Screen name="LectureOnHold" component={LectureOnHold} />
        <Stack.Screen name="DiscussionDetail" component={DiscussionDetail} />
        <Stack.Screen name="LabOnHold" component={LabOnHold} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;