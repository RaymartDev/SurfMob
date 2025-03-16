"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, useWindowDimensions } from "react-native"
import { StatusBar } from "expo-status-bar"

interface AssistantProfile {
  id: string
  name: string
  image: string
}

const assistants = [
  {
    id: "1",
    name: "House 1",
    image: require("./images/house1.png"),
  },
  {
    id: "2",
    name: "House 2",
    image: require("./images/house2.png"),
  },
]

export default function AssistScreen() {
  const [isActive, setIsActive] = useState(false)
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null)
  const { width } = useWindowDimensions()

  const isSmallScreen = width < 350

  const toggleAssist = () => {
    setIsActive(!isActive)
  }

  const handleAssistantSelect = (id: string) => {
    setSelectedAssistant(id)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Assist Now</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.grid}>
          {assistants.map((assistant) => (
            <TouchableOpacity
              key={assistant.id}
              style={[styles.profileCard, selectedAssistant === assistant.id && styles.selectedCard]}
              onPress={() => handleAssistantSelect(assistant.id)}
            >
              <View style={[styles.imageContainer, isSmallScreen && styles.imageContainerSmall]}>
                <Image source={ assistant.image } style={styles.profileImage} />
              </View>
              <Text style={styles.profileName}>{assistant.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.actionButton, isActive ? styles.stopButton : styles.startButton]}
          onPress={toggleAssist}
        >
          <Text style={[styles.actionButtonText, isActive ? styles.stopButtonText : styles.startButtonText]}>
            {isActive ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0077c2",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    color: "white",
    fontSize: 24,
    marginBottom: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  profileCard: {
    width: "45%",
    maxWidth: 180,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#4cd964",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  imageContainerSmall: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileName: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  actionButton: {
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 40,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
  },
  startButton: {
    backgroundColor: "#32CD32",
  },
  stopButton: {
    backgroundColor: "#ff3b30",
  },
  actionButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  startButtonText: {
    color: "white",
  },
  stopButtonText: {
    color: "white",
  },
})

