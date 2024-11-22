import React from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTaskStore } from "@/store/useTaskStore";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home() {
  const router = useRouter();
  const tasks = useTaskStore((state) => state.tasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des tâches</Text>
      {tasks.map((task) => (
        <View key={task.id} style={styles.card}>
          <Text style={styles.taskTitle}>{task.title}</Text>

          <Button
            title="Details"
            onPress={() => router.push(`/taskDetailsScreen?id=${task.id}`)}
          />

          <Pressable
            onPress={() => deleteTask(task.id)}
            style={styles.deleteButton}
          >
            <Icon name="delete" size={24} color="red" />
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
});
