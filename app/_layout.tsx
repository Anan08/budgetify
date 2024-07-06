import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black',
        headerShown: false,
        headerTintColor:'black',
        headerShadowVisible:true,
     }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color= 'black' }) => <FontAwesome size={25} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="income"
        options={{
          title: 'income',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="arrow-circle-down" color={color} />,
        }}
      />
      <Tabs.Screen
        name="outcome"
        options={{
          title: 'outcome',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="arrow-circle-up" color={color} />,
        }}
      />
    </Tabs>
  );
}
