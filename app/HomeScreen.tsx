import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, } from "expo-router";
import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';

interface HomeScreenProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  showPlusMenu: boolean;
  onTogglePlusMenu: () => void;
  onInputFocus: () => void;
  showClipboardToast: boolean;
  onClipboardScan: () => void;
  onScenarioPress: (scenario: 'financial' | 'malware' | 'safe') => void;
  onSearch: () => void;
}

export function HomeScreen({
  inputValue,
  onInputChange,
  showPlusMenu,
  onTogglePlusMenu,
  onInputFocus,
  showClipboardToast,
  onClipboardScan,
  onScenarioPress,
  onSearch,
}: HomeScreenProps) {
  return (
    <ScrollView style={styles.homeScroll} contentContainerStyle={styles.homeContent}>
      {/* Logo & Title */}
      <View style={styles.headerSection}>
        <View style={styles.logoBox}>
          <MaterialCommunityIcons name="shield" size={32} color="#fff" />
        </View>
        <Text style={styles.mainTitle}>SafeLens</Text>
        <Text style={styles.tagline}>AI opens it first, keeping your phone safe.</Text>
      </View>

      {/* Input Field */}
      <View style={styles.inputWrapper}>
        <View style={styles.plusMenuContainer}>
          <TouchableOpacity 
            style={[styles.plusButton, showPlusMenu && styles.plusButtonActive]}
            onPress={onTogglePlusMenu}
          >
            <MaterialCommunityIcons 
              name="plus" 
              size={24} 
              color={showPlusMenu ? "#0f172a" : "#64748b"} 
              style={{ transform: [{ rotate: showPlusMenu ? '45deg' : '0deg' }] }}
            />
          </TouchableOpacity>
          
          {showPlusMenu && (
            <View style={styles.plusMenu}>
              
              <Link href="/qrscan" asChild>
                <TouchableOpacity style={styles.menuItem}>
                  <MaterialCommunityIcons name="qrcode-scan" size={16} color="#4f46e5" />
                  <Text style={styles.menuItemText}>Scan QR</Text>
                </TouchableOpacity>
              </Link>
              
              <Link href="/gallery" asChild>
                <TouchableOpacity style={styles.menuItem}>
                  <MaterialCommunityIcons name="image" size={16} color="#16a34a" />
                  <Text style={styles.menuItemText}>Gallery</Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}
        </View>
        <TextInput
          placeholder="Enter URL or paste link"
          value={inputValue}
          onChangeText={onInputChange}
          style={styles.input}
          placeholderTextColor="#a1a1a1"
          clearButtonMode="while-editing"
          onFocus={onInputFocus}
        />
        <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
          <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Clipboard Toast */}
      {showClipboardToast && (
        <View style={styles.toastContainer}>
          <View style={styles.toastIcon}>
            <MaterialCommunityIcons name="content-copy" size={16} color="#d97706" />
          </View>
          <View style={styles.toastContent}>
            <Text style={styles.toastLabel}>Clipboard Link Detected</Text>
            <Text style={styles.toastUrl}>bit.ly/prize-claim</Text>
          </View>
          <TouchableOpacity 
            style={styles.toastButton}
            onPress={onClipboardScan}
          >
            <Text style={styles.toastButtonText}>Scan</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Scenario Section */}
      <Text style={styles.scenarioHeader}>SELECT TEST SCENARIO</Text>
      
      <TouchableOpacity 
        style={[styles.scenarioCard, styles.redBorder]}
        onPress={() => onScenarioPress('financial')}
        activeOpacity={0.7}
      >
        <View style={[styles.scenarioIcon, styles.redIcon]}>
          <MaterialCommunityIcons name="credit-card" size={24} color="#dc2626" />
        </View>
        <View style={styles.scenarioText}>
          <Text style={styles.scenarioTitle}>Financial Fraud (Amazon)</Text>
          <Text style={styles.scenarioSubtitle}>Fake Payment & Phishing</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.scenarioCard, styles.orangeBorder]}
        onPress={() => onScenarioPress('malware')}
        activeOpacity={0.7}
      >
        <View style={[styles.scenarioIcon, styles.orangeIcon]}>
          <MaterialCommunityIcons name="file-alert" size={24} color="#ea580c" />
        </View>
        <View style={styles.scenarioText}>
          <Text style={styles.scenarioTitle}>Malware (DHL Express)</Text>
          <Text style={styles.scenarioSubtitle}>APK Download Smishing</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.scenarioCard, styles.greenBorder]}
        onPress={() => onScenarioPress('safe')}
        activeOpacity={0.7}
      >
        <View style={[styles.scenarioIcon, styles.greenIcon]}>
          <MaterialCommunityIcons name="shield-check" size={24} color="#16a34a" />
        </View>
        <View style={styles.scenarioText}>
          <Text style={styles.scenarioTitle}>Safe (Google)</Text>
          <Text style={styles.scenarioSubtitle}>Legitimate Site</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
      </TouchableOpacity>
    </ScrollView>
  );
}
