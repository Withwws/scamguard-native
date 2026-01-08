import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface ResultData {
  type: string;
  originalInput: string;
  url: string;
  riskScore: number;
  decision: string;
  features: number[];
  htmlLength: number;
  verdict: string;
  impersonating: string;
  category: string;
  serverLoc: string;
  evidence: Array<{
    icon: (props: any) => React.ReactElement;
    title: string;
    desc: string;
  }>;
  actionGuide?: Array<{
    title: string;
    text: string;
  }>;
}

interface ResultScreenProps {
  resultData: ResultData;
  onReset: () => void;
}

export function ResultScreen({ resultData, onReset }: ResultScreenProps) {
  const containerBgStyle = resultData.decision === 'ALLOW' ? styles.safeBg : styles.dangerBg;
  // resultData.verdict = resultData.decision === 'ALLOW' ? 'Official SSL certificate and domain verified.' : styles.dangerBg;

  switch (resultData.decision) {
  case 'WARN':
    resultData.verdict = 'Suspicious site with potential risks detected.';
    break;

  case 'BLOCK':
    resultData.verdict = 'This site is flagged for malicious content or security violations.';
    break;

  default:
    resultData.verdict = 'Official SSL certificate and domain verified.';
}

  return (
    <View style={styles.resultContainer}>
      <ScrollView style={styles.resultScroll} contentContainerStyle={styles.resultContent}>
        <View style={[styles.resultHeader, containerBgStyle]}>
          <View style={styles.dangerIconContainer}>
            <MaterialCommunityIcons
              name={resultData.decision === 'ALLOW' ? 'shield-check' : 'alert-outline'}
              size={48}
              color="#fff"
            />
          </View>
          <Text style={styles.resultTitle}>
            {resultData.decision === 'ALLOW' ? 'Link is Safe' : 'Danger Detected'}
          </Text>
          <Text style={styles.resultVerdict}>{resultData.verdict}</Text>
          {resultData.decision !== 'ALLOW' && (
            <View style={styles.riskBadge}>
              <MaterialCommunityIcons name="alert" size={14} color="#fff" />
              <Text style={styles.riskBadgeText}>Risk Score {resultData.riskScore}%</Text>
            </View>
          )}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionLabel}>AI ANALYSIS SUMMARY</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryIconBox}>
              <MaterialCommunityIcons name="credit-card" size={20} color="#dc2626" />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryCategory}>{resultData.category}</Text>
              <View style={styles.impersonatingRow}>
                {/* <Text style={styles.impersonatingLabel}>Impersonating: </Text> */}
                <Text style={styles.impersonatingValue}>{resultData.url}</Text>
              </View>
              <View style={styles.locationRow}>
                <MaterialCommunityIcons name="map-marker" size={12} color="#94a3b8" />
                <Text style={styles.locationText}>Location: {resultData.serverLoc}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.evidenceCard}>
          <View style={styles.evidenceHeader}>
            <Text style={styles.sectionLabel}>EVIDENCE DETAILS</Text>
            <Text style={styles.aiDetectedBadge}>AI Detected</Text>
          </View>
          {/* {resultData.evidence.map((e: any, idx: number) => (
            <View key={idx} style={styles.evidenceItem}>
              <View style={styles.evidenceIconBox}>{e.icon({ size: 18, color: '#64748b' })}</View>
              <View style={styles.evidenceContent}>
                <Text style={styles.evidenceTitle}>{e.title}</Text>
                <Text style={styles.evidenceDesc}>{e.desc}</Text>
              </View>
            </View>
          ))} */}
        </View>

        {resultData.decision !== 'ALLOW' && resultData.actionGuide && (
          <View style={styles.guideCard}>
            {resultData.actionGuide.map((a: any, i: number) => (
              <View key={i} style={styles.guideItem}>
                <View style={styles.guideNumber}>
                  <Text style={styles.guideNumberText}>{i + 1}</Text>
                </View>
                <View style={styles.guideContent}>
                  <Text style={styles.guideTitle}>{a.title}</Text>
                  <Text style={styles.guideDesc}>{a.text}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity onPress={onReset} style={styles.btnSecondary}>
          <Text style={styles.btnText}>Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDanger}>
          <Text style={styles.btnTextWhite}>
            {resultData.decision !== 'ALLOW' ? 'Block & Report' : 'Open Browser'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
