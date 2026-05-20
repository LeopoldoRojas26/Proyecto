import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { PlantsProvider } from '@/context/PlantsContext';

export default function RootLayout() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];

  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <PlantsProvider>
      <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="plant/[id]" 
            options={{ 
              headerShown: true, 
              headerTitle: 'Detalle de Planta',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="add-plant" 
            options={{ 
              headerShown: true, 
              headerTitle: 'Añadir Planta',
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              presentation: 'modal',
            }} 
          />
        </Stack>
      </ThemeProvider>
    </PlantsProvider>
  );
}
