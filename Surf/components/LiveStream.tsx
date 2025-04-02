import { IP_ADDRESS } from '@/constants/IP';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const LiveStream = () => {
    return (
        <View style={styles.videoContainer}>
            <WebView 
                source={{ uri: `${IP_ADDRESS}/video` }} 
                style={styles.video}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: 640,
        height: "60%",
    },
});

export default LiveStream;
