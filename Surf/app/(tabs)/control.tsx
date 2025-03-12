import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Animated, Pressable, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, CircleStop, CirclePlay, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from './images/logo.png';

// Initialize Socket.IO connection (update with Raspberry Pi's IP)
const socket = io("http://192.168.1.17:5000");

const Control = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [status, setStatus] = useState('Connecting...');
    const videoRef = useRef(null);

    const leftScale = useRef(new Animated.Value(1)).current;
    const rightScale = useRef(new Animated.Value(1)).current;
    const stopScale = useRef(new Animated.Value(1)).current;


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
            <LinearGradient
                colors={["#60a5fa", "#e0e7ff", "#a78bfa"]} // Corresponds to from-blue-400, via-indigo-100, to-purple-400
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
                >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                {/* Header */}
                <View style={styles.header}>
                    <Image source={Logo} style={styles.logo} />
                    <Text style={styles.headerTitle}>Boat Controller</Text>
                </View>

                {/* Live Video Streaming */}
                <View style={styles.videoContainer}>
                    <Video
                        ref={videoRef}
                        style={styles.video}
                        useNativeControls={false}
                        shouldPlay
                        isLooping
                    />
                </View>

                {/* Control Buttons */}
                <View style={styles.controlsContainer}>
                    <View style={styles.controlButtons}>
                        {/* Left Button */}
                        <Pressable onPressIn={() => handlePressIn(leftScale, "left")} onPressOut={() => handlePressOut(leftScale)}>
                            <Animated.View style={[styles.controlButton, { transform: [{ scale: leftScale }] }]}>
                                <ChevronLeft size={48} color="#4f46e5" />
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
                                    <CirclePlay size={48} color="#22c55e" />
                                )}
                            </Animated.View>
                        </Pressable>

                        {/* Right Button */}
                        <Pressable onPressIn={() => handlePressIn(rightScale, "right")} onPressOut={() => handlePressOut(rightScale)}>
                            <Animated.View style={[styles.controlButton, { transform: [{ scale: rightScale }] }]}>
                                <ChevronRight size={48} color="#4f46e5" />
                            </Animated.View>
                        </Pressable>
                    </View>

                    {/* Return to Base Button */}
                    <TouchableOpacity
                        style={[styles.returnButton, { backgroundColor: isActive ? "#ef4444" : "#4f46e5" }]}
                        onPress={toggleBoatActivity}
                    >
                        {isActive ? <CircleStop color="white" size={24} /> : <CornerDownLeft color="white" size={24} />}
                        <Text style={styles.returnButtonText}>{isActive ? "Returning" : "Return to Base"}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </LinearGradient>
        </SafeAreaProvider>
    );
};

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
    videoContainer: {
        width: "100%",
        height: "60%",
        backgroundColor: "black",
    },
    video: {
        width: "100%",
        height: "100%",
        backgroundColor: "black",
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
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    returnButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
});

export default Control;
