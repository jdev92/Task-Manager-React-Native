import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTaskStore } from "../store/useTaskStore";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const task = useTaskStore((state) => state.tasks.find((t) => t.id === id));

  if (!task) {
    return <Text style={styles.notFound}>Aucune tâche trouvée</Text>;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>
          {task.description || "Aucune description trouvée"}
        </Text>
        <Text style={styles.priority}>
          Priorité :{" "}
          <Text style={styles[`priority_${task.priority}`]}>
            {task.priority}
          </Text>
        </Text>
        <Text style={styles.date}>Créé le : {formatDate(task.createdAt)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  priority: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  priority_low: {
    color: "#4caf50",
  },
  priority_medium: {
    color: "#ff9800",
  },
  priority_high: {
    color: "#f44336",
  },
  date: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
  notFound: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
    marginTop: 40,
    fontWeight: "600",
  },
});
