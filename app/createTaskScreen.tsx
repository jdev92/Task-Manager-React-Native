import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useTaskStore } from "@/store/useTaskStore";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";

type FormValues = {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
};

export default function CreateTaskScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "", priority: "low" },
  });
  const addTask = useTaskStore((state) => state.addTask);
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    addTask({ ...data, completed: false });
    reset();
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Créer une tâche</Text>

      {/* Titre */}
      <Text style={styles.label}>Titre</Text>
      <Controller
        control={control}
        name="title"
        rules={{
          required: "Le titre est obligatoire",
          minLength: { value: 3, message: "Au moins 3 caractères requis" },
          maxLength: { value: 30, message: "Maximum 50 caractères requis" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.title && { borderColor: "red" }]}
            placeholder="Entrez un titre"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Entrez une description (optionnelle)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Priorité */}
      <Text style={styles.label}>Priorité</Text>
      <Controller
        control={control}
        name="priority"
        rules={{ required: "La priorité est obligatoire" }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.priorityContainer}>
            {["low", "medium", "high"].map((level) => (
              <Pressable
                key={level}
                onPress={() => onChange(level)}
                style={({ pressed }) => [
                  styles.priorityOption,
                  value === level && styles.selectedPriority(level),
                  pressed && styles.pressedPriority,
                ]}
              >
                <Text
                  style={
                    value === level
                      ? styles.priorityTextSelected
                      : styles.priorityText
                  }
                >
                  {level === "low"
                    ? "Faible"
                    : level === "medium"
                      ? "Moyenne"
                      : "Élevée"}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      />
      {errors.priority && (
        <Text style={styles.errorText}>{errors.priority.message}</Text>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Ajouter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  priorityOption: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectedPriority: (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return { backgroundColor: "#4caf50", borderColor: "#4caf50" };
      case "medium":
        return { backgroundColor: "#ff9800", borderColor: "#ff9800" };
      case "high":
        return { backgroundColor: "#f44336", borderColor: "#f44336" };
      default:
        return {};
    }
  },
  pressedPriority: {
    backgroundColor: "#d3d3d3",
  },
  priorityText: {
    color: "#555",
    fontSize: 16,
  },
  priorityTextSelected: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: "#388e3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
