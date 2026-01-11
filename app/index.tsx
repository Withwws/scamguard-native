import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LOADING_LOGS } from '../constants/logs';
import { SCENARIOS } from '../constants/scenarios';
import { HomeScreen } from './HomeScreen';
import { ResultScreen } from './ResultScreen';
import { ScanningScreen } from './ScanningScreen';
import { styles } from './styles';

export default function SafeLensScreen() {
  const { scannedQR, qrLink } = useLocalSearchParams();
  const [screen, setScreen] = useState<'home' | 'scanning' | 'result'>('home');
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [resultData, setResultData] = useState<any>(null);
  const [showClipboardToast, setShowClipboardToast] = useState(false);
  const [clipboardText, setClipboardText] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  useEffect(() => {
    if (scannedQR) {
      setInputValue(scannedQR as string);
      setShowPlusMenu(false);
    }
  }, [scannedQR]);

  useEffect(() => {
    if (qrLink) {
      setInputValue(qrLink as string);
      setShowPlusMenu(false);
    }
  }, [qrLink]);

  useEffect(() => {
    if (screen === 'scanning') {
      setLogs([]);
      let delay = 0;
      LOADING_LOGS.forEach((l, i) => {
        delay += 500 + Math.random() * 300;
        setTimeout(() => {
          setLogs((p) => [...p, l]);
          if (i === LOADING_LOGS.length - 1) setTimeout(() => setScreen('result'), 700);
        }, delay);
      });
    }
  }, [screen]);

  useEffect(() => {
    if (screen === 'home') {
      setShowClipboardToast(false);
      
      const checkClipboard = async () => {
        try {
          const text = await Clipboard.getStringAsync();
          if (text && text.trim().length > 0) {
            setClipboardText(text.trim());
            setTimeout(() => setShowClipboardToast(true), 500);
          }
        } catch (error) {
          console.log('Failed to read clipboard:', error);
        }
      };
      
      // Check immediately
      checkClipboard();
      
      // Then check every 5 seconds
      const interval = setInterval(() => checkClipboard(), 5000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  const startAnalysis = (key: keyof typeof SCENARIOS) => {
    const scenario = SCENARIOS[key] ?? SCENARIOS.safe;
    setInputValue(scenario.url);
    setResultData(scenario);
    setScreen('scanning');
  };

  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    
    try {
      setScreen('scanning');
      setLogs([]);
      console.log("🚀")
      
      // const response = await fetch('http://localhost:3000/analyze', {
      const response = await fetch('https://ai-phishing-url-production.up.railway.app/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      console.log("🚀 ~ handleSearch ~ data:", data)
      
      setResultData(data);
      
      // Simulate loading logs
      // let delay = 0;
      // LOADING_LOGS.forEach((l, i) => {
      //   delay += 500 + Math.random() * 300;
      //   setTimeout(() => {
      //     setLogs((p) => [...p, l]);
      //     if (i === LOADING_LOGS.length - 1) {
      //       setTimeout(() => setScreen('result'), 700);
      //     }
      //   }, delay);
      // });
    } catch (error) {
      console.error('Analysis error:', error);
      // You can add error handling UI here
      setScreen('home');
    }
  };

  const reset = () => {
    setScreen('home');
    setInputValue('');
    setLogs([]);
    setResultData(null);
    setShowClipboardToast(false);
    setShowPlusMenu(false);
  };

  // console.log('handleSearch called',{handleSearch});
  return (
    <SafeAreaView style={styles.container}>
      {screen === 'home' && (
        <HomeScreen
          inputValue={inputValue}
          onInputChange={setInputValue}
          showPlusMenu={showPlusMenu}
          onTogglePlusMenu={() => setShowPlusMenu(!showPlusMenu)}
          onInputFocus={() => setShowPlusMenu(false)}
          showClipboardToast={showClipboardToast}
          clipboardText={clipboardText}
          onClipboardScan={() => {
            setInputValue(clipboardText);
            // setShowClipboardToast(false);
          }}
          onScenarioPress={startAnalysis}
          onSearch={handleSearch}
          // onSearch={() => startAnalysis('safe')}
        />
      )}

      {screen === 'scanning' && <ScanningScreen logs={logs} />}

      {screen === 'result' && resultData && (
        <ResultScreen resultData={resultData} onReset={reset} />
      )}
    </SafeAreaView>
  );
}
