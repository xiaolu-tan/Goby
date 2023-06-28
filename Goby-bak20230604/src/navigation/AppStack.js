/*
 * @Author: Xiaolu Tan xiaolutan@apexglobe.com
 * @Date: 2022-05-02 21:57:26
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2023-04-19 14:22:32
 * @FilePath: /react-navigation-v6-mix-master/src/navigation/AppStack.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MomentsScreen from '../screens/MomentsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExperienceList, {ExperienceDetail} from '../screens/ExperienceScreen';
import ProjectList from '../screens/ProjectScreen';
import {ProjectDetail} from '../screens/ProjectScreen';
import EducationList, {EducationDetail} from '../screens/EducationScreen';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import JobManagementScreen from '../screens/JobManagementScreen';
import {JobDetailScreen} from '../screens/JobManagementScreen';
import NewJobScreen from '../screens/NewJobScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#3B71F3',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        // component={TabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
          headerShown: true,
        }}
      />
      {/* <Drawer.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Moments"
        component={MomentsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Job Management"
        component={JobManagementScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="document-outline" size={22} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Root}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExperienceList"
        component={ExperienceList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ExperienceDetail"
        component={ExperienceDetail}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ProjectList"
        component={ProjectList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetail}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EducationList"
        component={EducationList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EducationDetail"
        component={EducationDetail}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="NewJob"
        component={NewJobScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
