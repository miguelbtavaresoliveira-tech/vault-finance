import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: isDarkMode ? '#1E293B' : '#6366F1' },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: 'bold' },
                headerRight: () => (
                    <Ionicons 
                        name={isDarkMode ? 'sunny' : 'moon'} 
                        size={24} 
                        color="#FFFFFF" 
                        style={{ marginRight: 15 }} 
                        onPress={toggleTheme} 
                    />
                ),
                tabBarActiveTintColor: isDarkMode ? '#818CF8' : '#6366F1',
                tabBarInactiveTintColor: '#94A3B8',
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                    borderTopColor: isDarkMode ? '#334155' : '#E2E8F0',
                },
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName

                    if(route.name === 'Dashboard') {
                        iconName = focused ? 'grid' : 'grid-outline'
                    } else if (route.name === 'Histórico') {
                        iconName = focused ? 'list' : 'list-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
            })}
            >

                <Tab.Screen 
                name='Dashboard'
                component={DashboardScreen}
                options={{ title: 'Visão Geral' }}
                />
                <Tab.Screen 
                name='Histórico'
                component={HistoryScreen}
                options={{ title: 'Minhas Transações' }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}