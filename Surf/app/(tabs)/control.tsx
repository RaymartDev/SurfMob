import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Animated, Pressable, Image, ScrollView } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { CornerDownLeft, CircleStop, CirclePlay, ArrowBigLeft, ArrowBigRight, ArrowBigDown, ArrowBigUp } from 'lucide-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";
import { IP_ADDRESS, IP_ADDRESS_SOCKET } from '@/constants/IP';
import { useFocusEffect } from 'expo-router';

// Initialize Socket.IO connection (update with Raspberry Pi's IP)
const socket = io(IP_ADDRESS_SOCKET);

const Control = () => {
    useFocusEffect(
        useCallback(() => {
          fetch(`${IP_ADDRESS}/status`, { // Ensure the correct endpoint
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mode: "control" }),
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
    
          return () => {};
        }, [])
      );

    const [isActive, setIsActive] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReversing, setIsReversing] = useState(false);
    const videoRef = useRef(null);

    const leftScale = useRef(new Animated.Value(1)).current;
    const rightScale = useRef(new Animated.Value(1)).current;
    const stopScale = useRef(new Animated.Value(1)).current;
    const reverseScale = useRef(new Animated.Value(1)).current;

    const Stream = require("./images/streampic.png")

    // Function to send command via Socket.IO
    const sendCommand = (command: string) => {
        socket.emit(command);
        console.log(`Command sent: ${command}`);
    };

    const controlLeft = () => {
        sendCommand("control_left");
    }
    const controlRight = () => {
        sendCommand("control_right");
    }
    const controlStop = () => {
        sendCommand("control_stop");
    }
    const controlForward = () => {
        sendCommand("control_forward");
    }
    const controlReverse = () => {
        sendCommand("control_reverse");
    }

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
    // Play/Stop toggle logic
    const toggleForwardReverse = () => {
        setIsReversing(!isReversing);
    };

    return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Control</Text>
                </View>
                <View style={styles.content}>
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
                        <Pressable onPressIn={() => {
                            handlePressIn(leftScale, "left")
                            if(isPlaying) {
                                controlLeft()
                            }
                        }} onPressOut={() => {
                            handlePressOut(leftScale)
                            if (isPlaying) {
                                if (isReversing) {
                                    controlReverse()
                                } else {
                                    controlForward()
                                }
                            } else {
                                controlStop()
                            }
                        }}>
                            <Animated.View style={[styles.controlButton, { transform: [{ scale: leftScale }] }]}>
                                <ArrowBigLeft size={48} strokeWidth={2} color="#0077c2" />
                            </Animated.View>
                        </Pressable>

                        {/* Play/Stop Button */}
                        <Pressable
                            onPressIn={() => {
                                handlePressIn(stopScale, isPlaying ? "stop" : "start")
                                if(isPlaying) {
                                    setIsReversing(false)
                                    controlStop()
                                } else {
                                    controlForward()
                                }
                            }}
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
                        <Pressable onPressIn={() => {
                            handlePressIn(rightScale, "right")
                            if (isPlaying) {
                                controlRight()
                            }
                        }} onPressOut={() => {
                            handlePressOut(rightScale)
                            if (isPlaying) {
                                if (isReversing) {
                                    controlReverse()
                                } else {
                                    controlForward()
                                }
                            } else {
                                controlStop()
                            }
                        }}>
                            <Animated.View style={[styles.controlButton, { transform: [{ scale: rightScale }] }]}>
                                <ArrowBigRight size={48} strokeWidth={2} color="#0077c2" />
                            </Animated.View>
                        </Pressable>
                    </View>
                        {/* Play/Stop Button */}
                        <View style={styles.controlButtons}>
                        <Pressable
                            onPressIn={() => {
                                handlePressIn(reverseScale, !isReversing ? "Reversing" : "Forward")
                                if(!isReversing) {
                                    if(isPlaying) {
                                        controlReverse()
                                    }
                                } else {
                                    if(isPlaying) {
                                        controlForward()
                                    }
                                }
                            }}
                            onPressOut={() => {
                                handlePressOut(reverseScale);
                                if (isPlaying) {
                                    toggleForwardReverse();
                                }
                            }}
                        >
                            <Animated.View style={[styles.controlButton, { transform: [{ scale: reverseScale }] }]}>
                                {isReversing ? (
                                    <ArrowBigUp size={48} color="#0077c2" />
                                ) : (
                                    <ArrowBigDown size={48} color="#0077c2" />
                                )}
                            </Animated.View>
                        </Pressable>
                        </View>
                </View>
                </View>
                </ScrollView>
            </SafeAreaView>
            
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
      content: {
        flex: 1,
      },
      scrollContainer: {
        flexGrow: 1,
        paddingBottom: 50,
      }
});

export default Control;
