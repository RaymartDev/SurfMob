import { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import { Play, Anchor } from "lucide-react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import Logo from "./images/logo.png"

const Simulation = () => {
    const [isSimulationActive, setIsSimulationActive] = useState(false)

    const toggleSimulation = () => {
        setIsSimulationActive(!isSimulationActive)
    }

    const handleRescue = (rescueNumber: number) => {
        console.log(`Rescue ${rescueNumber} initiated`)
        // Add rescue logic here
    }

    return (
        <SafeAreaProvider >
            <LinearGradient
                colors={["#60a5fa", "#e0e7ff", "#a78bfa"]} // Corresponds to from-blue-400, via-indigo-100, to-purple-400
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
                >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image source={Logo} style={styles.logo} />
                    <Text style={styles.headerTitle}>Simulation Control</Text>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity
                        style={[styles.button, styles.startButton, isSimulationActive && styles.activeButton]}
                        onPress={toggleSimulation}
                        accessibilityLabel={isSimulationActive ? "Stop Simulation" : "Start Simulation"}
                        accessibilityHint="Toggles the boat simulation on or off"
                    >
                        <Play color="white" size={24} />
                        <Text style={styles.buttonText}>{isSimulationActive ? "Stop Simulation" : "Start Simulation"}</Text>
                    </TouchableOpacity>

                    {isSimulationActive && (
                        <View style={styles.rescueContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.rescueButton]}
                                onPress={() => handleRescue(1)}
                                disabled={!isSimulationActive}
                                accessibilityLabel="Rescue 1"
                                accessibilityHint="Initiates rescue operation 1"
                            >
                                <Anchor color="white" size={24} />
                                <Text style={styles.buttonText}>Rescue 1</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.rescueButton]}
                                onPress={() => handleRescue(2)}
                                disabled={!isSimulationActive}
                                accessibilityLabel="Rescue 2"
                                accessibilityHint="Initiates rescue operation 2"
                            >
                                <Anchor color="white" size={24} />
                                <Text style={styles.buttonText}>Rescue 2</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </SafeAreaView>
            </LinearGradient>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 32,
        height: 32
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "transparent",
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6ff",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 12,
        color: "white",
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
        margin: 16,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    startButton: {
        backgroundColor: "#70affa",
    },
    activeButton: {
        backgroundColor: "#ef4444",
    },
    rescueButton: {
        backgroundColor: "#70affa",
        flex: 1,
        marginHorizontal: 4,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 8,
    },
    rescueContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
})

export default Simulation
