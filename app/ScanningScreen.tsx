import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { styles } from './styles';

interface ScanningScreenProps {
  logs: string[];
}

export function ScanningScreen({ logs }: ScanningScreenProps) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#4f46e5" />
      <Text style={styles.scanTitle}>Accessing via AI Sandbox</Text>
      <Text style={styles.scanSubtitle}>AI is interacting with the link in a safe virtual environment.</Text>

      {/* <ScrollView style={styles.logBox}>
        {logs.map((l, i) => (
          <View key={i} style={styles.logItem}>
            <View style={styles.logDot} />
            <Text style={styles.logText}>{l}</Text>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
}
