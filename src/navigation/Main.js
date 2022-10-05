import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Receitas } from '../screens/private/Receitas';
import { Settings } from '../screens/private/Settings';
import { Chat } from '../screens/private/Chat';

import { Login } from '../screens/public/Login';
import { Register } from '../screens/public/Register';
import { RecoveryAccount } from '../screens/public/RecoveryAccount';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

function InsideTabs() {
  return (
    <MainTab.Navigator
      defaultScreenOptions={Chat}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffcd0e',
      }}
    >
      <MainTab.Screen
        name="Receitas"
        component={Receitas}
        options={{
          title: 'Receitas',
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name="pot-steam-outline"
              color={color}
              size={focused ? size + 2 : size}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'ChefBot',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name="md-chatbubbles-outline"
              color={color}
              size={focused ? size + 2 : size}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name="settings-outline"
              color={color}
              size={focused ? size + 2 : size}
            />
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
