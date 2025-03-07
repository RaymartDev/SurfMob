
import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Anchor, Activity, AlertTriangle, Package, Navigation, Pause, Play } from "lucide-react-native"

export default function App() {
    // State for boat status
    const [isActive, setIsActive] = useState(false)
    const [boatState, setBoatState] = useState("Stop") // 'Patrolling', 'Stuck', 'Stop'
    const [hasWeight, setHasWeight] = useState(false)
    const [batteryLevel, setBatteryLevel] = useState(78)

    // Simulate changing boat state
    useEffect(() => {
        if (isActive) {
            setBoatState("Patrolling")
        } else if(!isActive) {
            setBoatState("Stop")
        } else {
            setBoatState('Stuck')
        }
    }, [isActive])

    // Function to toggle boat activity
    const toggleBoatActivity = () => {
        setIsActive(!isActive)
    }

    // Function to simulate boat getting stuck
    const simulateStuck = () => {
        if (isActive) {
            setBoatState("Stuck")
        }
    }

    // Function to simulate weight change
    const toggleWeight = () => {
        setHasWeight(!hasWeight)
    }

    // Get color based on boat state
    const getStateColor = (state: string) => {
        switch (state) {
            case "Patrolling":
                return "#70affa" // Blue
            case "Stuck":
                return "#ef4444" // Red
            case "Stop":
                return "#6b7280" // Gray
            default:
                return "#6b7280"
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />

                {/* Header */}
                <View style={styles.header}>
                    <Anchor color="#0284c7" size={28} />
                    <Text style={styles.headerTitle}>Boat Dashboard</Text>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                    {/* Main Status Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Activity size={24} color="#0284c7" />
                            <Text style={styles.cardTitle}>Boat Status</Text>
                        </View>
                        <View style={styles.statusContainer}>
                            <View style={styles.statusItem}>
                                <Text style={styles.statusLabel}>Active</Text>
                                <View style={[styles.statusIndicator, { backgroundColor: isActive ? "#70affa" : "#6b7280" }]}>
                                    <Text style={styles.statusText}>{isActive ? "ON" : "OFF"}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: isActive ? "#ef4444" : "#70affa" }]}
                            onPress={toggleBoatActivity}
                        >
                            {isActive ? <Pause color="white" size={20} /> : <Play color="white" size={20} />}
                            <Text style={styles.actionButtonText}>{isActive ? "Stop Boat" : "Start Boat"}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Boat State Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Navigation size={24} color="#0284c7" />
                            <Text style={styles.cardTitle}>Navigation State</Text>
                        </View>
                        <View style={styles.stateContainer}>
                            <View style={[styles.stateIndicator, { backgroundColor: getStateColor(boatState) }]}>
                                {boatState === "Stuck" && <AlertTriangle color="white" size={20} />}
                                <Text style={styles.stateText}>{boatState}</Text>
                            </View>
                            <Text style={styles.stateDescription}>
                                {boatState === "Patrolling" && "Boat is actively patrolling the designated area."}
                                {boatState === "Stuck" && "Boat has encountered an obstacle and needs assistance."}
                                {boatState === "Stop" && "Boat is currently stopped and not in operation."}
                            </Text>
                        </View>
                    </View>

                    {/* Weight Sensor Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Package size={24} color="#0284c7" />
                            <Text style={styles.cardTitle}>Weight Sensor</Text>
                        </View>
                        <View style={styles.weightContainer}>
                            <View style={styles.weightStatus}>
                                <Text style={styles.weightLabel}>Current Weight:</Text>
                                <Text style={styles.weightValue}>3 kg</Text>
                            </View>
                            <View style={[styles.weightIndicator, { backgroundColor: "#70affa" }]}>
                                <Text style={styles.weightText}>Load Detected</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 12,
        color: "#0f172a",
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        gap: 16,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 8,
        color: "#0f172a",
    },
    statusContainer: {
        gap: 16,
    },
    statusItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    statusLabel: {
        fontSize: 16,
        color: "#334155",
    },
    statusIndicator: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        minWidth: 60,
        alignItems: "center",
    },
    statusText: {
        color: "white",
        fontWeight: "600",
    },
    stateContainer: {
        alignItems: "center",
        gap: 12,
    },
    stateIndicator: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    stateText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },
    stateDescription: {
        textAlign: "center",
        color: "#64748b",
        fontSize: 14,
    },
    weightContainer: {
        gap: 16,
    },
    weightStatus: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    weightLabel: {
        fontSize: 16,
        color: "#334155",
    },
    weightIndicator: {
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    weightValue: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0284c7",
    },
    weightText: {
        color: "white",
        fontWeight: "600",
    },
    actionButton: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    actionButtonText: {
        color: "white",
        fontWeight: "600",
    },
})
