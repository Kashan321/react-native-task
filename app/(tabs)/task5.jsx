import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider'; 

const tracks = [
  {
    id: '1',
    title: 'Rosa Linn - SNAP',
    artist: 'Rosa Linn',
    url: require("../../assets/audio/snap.mp3"), 
  },
  {
    id: '2',
    title: 'TU HAI KAHAN',
    artist: 'Raffey - Usama - Ahad ',
    url: require("../../assets/audio/THK.mp3"), 
  },
];

const AudioPlayer = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        tracks[currentTrackIndex].url, 
        { shouldPlay: true }
      );
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setProgress(status.positionMillis / status.durationMillis);
      setDuration(status.durationMillis);
    } else if (status.error) {
      console.error("Playback error:", status.error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const nextTrack = async () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      await stopSound(); 
      await playSound(); 
    }
  };

  const prevTrack = async () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      await stopSound(); 
      await playSound(); 
    }
  };

  const seekTo = async (value) => {
    if (sound) {
      const seekPosition = value * duration; 
      await sound.setPositionAsync(seekPosition);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tracks[currentTrackIndex].title}</Text>
      <Text style={styles.artist}>{tracks[currentTrackIndex].artist}</Text>
      <Slider
        style={styles.progressBar}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        onSlidingComplete={seekTo}
        minimumTrackTintColor="#FF5722"
        maximumTrackTintColor="#FFFFFF"
      />
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={prevTrack} disabled={currentTrackIndex === 0} />
        <Button title={isPlaying ? 'Stop' : 'Play'} onPress={isPlaying ? stopSound : playSound} />
        <Button title="Next" onPress={nextTrack} disabled={currentTrackIndex === tracks.length - 1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: 'lightgray',
    marginBottom: 20,
  },
  progressBar: {
    width: '80%',
    height: 40,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default AudioPlayer;
