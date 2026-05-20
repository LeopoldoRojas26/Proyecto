import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -2 },
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mis Plantas',
          headerTitle: 'Mi Jardín 🌿',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'leaf' : 'leaf-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Recordatorios',
          headerTitle: 'Tareas de Cuidado 💧',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'water' : 'water-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendario',
          headerTitle: 'Calendario Verde 📅',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diagnose"
        options={{
          title: 'Diagnóstico',
          headerTitle: 'Clínica de Plantas 🏥',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'medkit' : 'medkit-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          headerTitle: 'Biblioteca Botánica 🔍',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
