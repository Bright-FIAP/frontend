import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { List } from '../screens/List';
import { TextDemo } from '../screens/Demos';
import { Settings } from '../screens/private/Settings';

import { Login } from '../screens/public/Login';
import { Register } from '../screens/public/Register';
import { RecoveryAccount } from '../screens/public/RecoveryAccount';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

function InsideTabs() {
  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen
        name="TextDemo"
        component={TextDemo}
        options={{
          title: 'Receitas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="pot-steam-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="List"
        component={List}
        options={{
          title: 'ChefBot',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-chatbubbles-outline" color={color} size={size} />
          ),
        }}
      />
      {/* <MainTab.Screen
        name="FormDemo"
        component={FormDemo}
        options={{ headerTitle: 'Button Demo' }}
      /> */}
      <MainTab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

export const Main = () => (
  <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="Register" component={Register} />
        <MainStack.Screen name="RecoveryAccount" component={RecoveryAccount} />
        <MainStack.Screen name="InsideApp" component={InsideTabs} />
      </MainStack.Navigator>
    </SafeAreaView>
  </SafeAreaProvider>
);