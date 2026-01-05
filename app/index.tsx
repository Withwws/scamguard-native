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

  const reset = () => {
    setScreen('home');
    setInputValue('');
    setLogs([]);
    setResultData(null);
    setShowClipboardToast(false);
    setShowPlusMenu(false);
  };

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
          onSearch={() => startAnalysis('safe')}
        />
      )}

      {screen === 'scanning' && <ScanningScreen logs={logs} />}

      {screen === 'result' && resultData && (
        <ResultScreen resultData={resultData} onReset={reset} />
      )}
    </SafeAreaView>
  );
}
