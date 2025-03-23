import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { IP_ADDRESS, IP_ADDRESS_SOCKET } from "@/constants/IP"
import { io } from "socket.io-client"

// Define boat states as an enum for better type safety
type BoatState = "idle" | "patrolling" | "control"

const socket = io(IP_ADDRESS_SOCKET);

export default function BoatCommand() {
  // Use a string state instead of boolean to handle multiple states
  const [boatState, setBoatState] = useState<BoatState>("idle")
  const [isActive, setIsActive] = useState(false)

  const toggleBoatStatus = () => {
    const newActiveState = !isActive
    setIsActive(newActiveState)

    // Set initial state when activating
    if (newActiveState) {
      setBoatState("patrolling")
      fetch(`${IP_ADDRESS}/status`, { // Ensure the correct endpoint
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ mode: "patrol" }),
                })
                  .then((response) => {
                    if (!response.ok) {
                      return response.text().then((text) => {
                        throw new Error(`HTTP Error ${response.status}: ${text}`);
                      });
                    }
                    return response.json();
                  })
                  .then((data) => console.log("Server Response:", data))
                  .catch((error) => console.error("Fetch Error:", error));
    } else {
      setBoatState("idle")
      fetch(`${IP_ADDRESS}/status`, { // Ensure the correct endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: "idle" }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(`HTTP Error ${response.status}: ${text}`);
            });
          }
          return response.json();
        })
        .then((data) => console.log("Server Response:", data))
        .catch((error) => console.error("Fetch Error:", error));
      socket.emit('force_stop');
    }
  }

  // Function to change boat state
  const changeBoatState = (newState: BoatState) => {
    if (isActive) {
      setBoatState(newState)
    }
  }

  // Get the appropriate status indicator color
  const getStatusColor = () => {
    if (!isActive) return styles.statusOff
    return styles.statusOn
  }

  // Get the appropriate navigation indicator color and text
  const getNavigationStyle = () => {
    switch (boatState) {
      case "idle":
        return {
          style: styles.idleIndicator,
          text: "Idle",
        }
      case "patrolling":
        return {
          style: styles.patrollingIndicator,
          text: "Patrolling",
        }
      case "control":
        return {
          style: styles.controlIndicator,
          text: "Control",
        }
    }
  }

  // Get the navigation description text
  const getNavigationDescription = () => {
    switch (boatState) {
      case "idle":
        return "Boat is currently idle and not in operation"
      case "patrolling":
        return "Boat is actively patrolling the designated area"
      case "control":
        return "Boat is in manual control mode"
    }
  }

  const navStyle = getNavigationStyle()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Boat Command</Text>
        <Text style={styles.subtitle}>Real-time monitoring of{"\n"}emergency supply deliveries.</Text>
      </View>

      <View style={styles.content}>
        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.statusContainer}>
              <Ionicons name="radio-button-on" size={20} color="#0056a6" />
              <Text style={styles.cardTitle}>Status</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusText}>Active</Text>
              <View style={[styles.statusIndicator, getStatusColor()]}>
                <Text style={styles.statusIndicatorText}>{isActive ? "ON" : "OFF"}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.actionButton, isActive ? styles.stopButton : styles.startButton]}
            onPress={toggleBoatStatus}
          >
            <Text style={styles.actionButtonText}>{isActive ? "Stop Patrolling" : "Commence Patrol"}</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.statusContainer}>
              <MaterialCommunityIcons name="navigation-variant" size={20} color="#0056a6" />
              <Text style={styles.cardTitle}>Navigation</Text>
            </View>
          </View>
          <View style={styles.navigationStatus}>
            <View style={[styles.statusIndicator, navStyle.style]}>
              <Text style={styles.statusIndicatorText}>{navStyle.text}</Text>
            </View>
          </View>
          <Text style={styles.navigationText}>{getNavigationDescription()}</Text>
        </View>

        {/* Weight Sensor Card */}
        {/* <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.statusContainer}>
              <MaterialCommunityIcons name="weight" size={20} color="#0056a6" />
              <Text style={styles.cardTitle}>Weight Sensor</Text>
            </View>
          </View>
          <View style={styles.weightContainer}>
            <Text style={styles.weightLabel}>Current Weight:</Text>
            <Text style={styles.weightValue}>3kg</Text>
          </View>
          <TouchableOpacity style={styles.loadButton}>
            <Text style={styles.loadButtonText}>Load Detected</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0077c2",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "Poppins-Bold"
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    opacity: 0.9,
    fontFamily: "Poppins-Regular"
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: "#0056a6",
    marginLeft: 8,
    fontFamily: "Poppins-SemiBold"
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 28,
    fontFamily: "Poppins-Regular",
  },
  statusIndicator: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    minWidth: 50,
    alignItems: "center",
  },
  statusOn: {
    backgroundColor: "#0077c2",
  },
  statusOff: {
    backgroundColor: "#333",
  },
  idleIndicator: {
    backgroundColor: "#888", // Gray for idle
  },
  patrollingIndicator: {
    backgroundColor: "#0077c2", // Blue for patrolling
  },
  controlIndicator: {
    backgroundColor: "#ff9500", // Orange for control
  },
  statusIndicatorText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  actionButton: {
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  startButton: {
    backgroundColor: "#0077c2",
  },
  stopButton: {
    backgroundColor: "#ff3b30",
  },
  actionButtonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  navigationStatus: {
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  navigationText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Poppins-Regular"
  },
  weightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  weightLabel: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular"
  },
  weightValue: {
    fontSize: 14,
    color: "#0056a6",
    fontFamily: "Poppins-SemiBold"
  },
  loadButton: {
    backgroundColor: "#0077c2",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
  },
  loadButtonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  }
})

