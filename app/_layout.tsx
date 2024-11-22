import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

const RootLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Liste",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="createTaskScreen"
        options={{
          title: "Créer une tâche",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="create" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="taskDetailsScreen"
        options={{
          title: "Détails",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="details" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
