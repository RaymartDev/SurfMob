import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Animated, Pressable, Image } from 'react-native';
import { useState, useRef } from 'react';
import { CornerDownLeft, CircleStop, CirclePlay, ChevronLeft, ChevronRight, ArrowBigLeft, ArrowBigRight } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";

// Initialize Socket.IO connection (update with Raspberry Pi's IP)
const socket = io("http://192.168.1.17:5000");

const Control = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const leftScale = useRef(new Animated.Value(1)).current;
    const rightScale = useRef(new Animated.Value(1)).current;
    const stopScale = useRef(new Animated.Value(1)).current;

    const Stream = require("./images/streampic.png")

    // Function to send command via Socket.IO
    const sendCommand = (command: string) => {
        socket.emit(command);
        console.log(`Command sent: ${command}`);
    };

    // Boat Activity Toggle
    const toggleBoatActivity = () => {
        setIsActive(!isActive);
    };

    // Button Animation Handlers
    const handlePressIn = (scale: Animated.Value, command: string) => {
        Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start();
        sendCommand(command);
    };

    const handlePressOut = (scale: Animated.Value) => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    };

    // Play/Stop toggle logic
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Control</Text>
                </View>

                {/* Live Video Streaming */}
                <View style={styles.videoContainer}>
                    <Image 
                        source={Stream} 
                        style={styles.video}
                        />
                </View>

                {/* Control Buttons */}
                <View style={styles.controlsContainer}>
                    <View style={styles.controlButtons}>
                        {/* Left Button */}
                        <Pressable onPressIn={() => handlePressIn(leftScale, "left")} onPressOut={() => handlePressOut(leftScale)}>
                            <Animated.View style={[styles.controlButton, { transform: [{ scale: leftScale }] }]}>
                                <ArrowBigLeft size={48} strokeWidth={2} color="#0077c2" />
                            </Animated.View>
                        </Pressable>

                        {/* Play/Stop Button */}
                        <Pressable
                            onPressIn={() => handlePressIn(stopScale, isPlaying ? "stop" : "start")}
                            onPressOut={() => {
                                handlePressOut(stopScale);
                                togglePlayPause();
                            }}
                        >
                            <Animated.View style={[styles.controlButton, { transform: [{ scale: stopScale }] }]}>
                                {isPlaying ? (
                                    <CircleStop size={48} color="#ef4444" />
                                ) : (
                                    <CirclePlay size={48} color="#0077c2" />
                                )}
                            </Animated.View>
                        </Pressable>

                        {/* Right Button */}
                        <Pressable onPressIn={() => handlePressIn(rightScale, "right")} onPressOut={() => handlePressOut(rightScale)}>
                            <Animated.View style={[styles.controlButton, { transform: [{ scale: rightScale }] }]}>
                                <ArrowBigRight size={48} strokeWidth={2} color="#0077c2" />
                            </Animated.View>
                        </Pressable>
                    </View>

                    {/* Return to Base Button */}
                    <TouchableOpacity
                        style={[styles.returnButton, { backgroundColor: isActive ? "#ff3b30" : "#32CD32" }]}
                        onPress={toggleBoatActivity}
                    >
                        {isActive ? <CircleStop color="white" size={24} /> : <CornerDownLeft color="white" size={24} />}
                        <Text style={styles.returnButtonText}>{isActive ? "Returning" : "Return to Base"}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0077c2",
    },
    logo: {
        width: 32,
        height: 32
    },
    header: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 6,
        backgroundColor: "transparent",
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: "Poppins-Bold",
        marginLeft: 12,
        color: "white",
    },
    videoContainer: {
        width: "100%",
        height: "60%",
        backgroundColor: "black",
        borderRadius: 40,
    },
    video: {
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        borderRadius: 40,
    },
    controlsContainer: {
        backgroundColor: 'transparent',
        width: "100%",
        alignItems: "center",
        paddingVertical: 20,
    },
    controlButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "80%",
        marginBottom: 20,
    },
    controlButton: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    returnButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: '65%',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    returnButtonText: {
        color: "white",
        fontSize: 18,
        fontFamily: "Poppins-Bold",
        marginLeft: 8,
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
});

export default Control;
