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
  const { scannedQR } = useLocalSearchParams();
  const [screen, setScreen] = useState<'home' | 'scanning' | 'result'>('home');
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [resultData, setResultData] = useState<any>(null);
  const [showClipboardToast, setShowClipboardToast] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  useEffect(() => {
    if (scannedQR) {
      setInputValue(scannedQR as string);
      setShowPlusMenu(false);
    }
  }, [scannedQR]);

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
      const timer = setTimeout(() => setShowClipboardToast(true), 1500);
      return () => clearTimeout(timer);
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
      
      const response = await fetch('http://localhost:3000/analyze', {
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
      let delay = 0;
      LOADING_LOGS.forEach((l, i) => {
        delay += 500 + Math.random() * 300;
        setTimeout(() => {
          setLogs((p) => [...p, l]);
          if (i === LOADING_LOGS.length - 1) {
            setTimeout(() => setScreen('result'), 700);
          }
        }, delay);
      });
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
          onClipboardScan={() => {
            setInputValue('https://bit.ly/prize-claim');
            setShowClipboardToast(false);
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
