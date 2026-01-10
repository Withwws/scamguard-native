import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface ResultData {
  type: string;
  originalInput: string;
  url: string;
  riskScore: number;
  finalRiskScore: number;
  decision: string;
  finalDecision: string;
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
  llmAnalysis: {
    success: boolean;
    analysis: {
      phishingType: string;
      targetService: string;
      techniques: string[];
      evidence: Array<{
        type: string;
        description: string;
      }>;
    };
    recommendations: string[];
  };
}

interface ResultScreenProps {
  resultData: ResultData;
  onReset: () => void;
}

export function ResultScreen({ resultData, onReset }: ResultScreenProps) {
  const containerBgStyle = resultData.finalDecision === 'ALLOW' ? styles.safeBg : styles.dangerBg;
  // resultData.verdict = resultData.decision === 'ALLOW' ? 'Official SSL certificate and domain verified.' : styles.dangerBg;

  switch (resultData.finalDecision) {
  case 'WARN':
    resultData.verdict = 'Suspicious site with potential risks detected.';
    break;

  case 'BLOCK':
    resultData.verdict = 'This site is flagged for malicious content or security violations.';
    break;

  default:
    resultData.verdict = 'Verified safe: No security threats or malicious patterns detected.';
}

  return (
    <View style={styles.resultContainer}>
      <ScrollView style={styles.resultScroll} contentContainerStyle={styles.resultContent}>
        <View style={[styles.resultHeader, containerBgStyle]}>
          <View style={styles.dangerIconContainer}>
            <MaterialCommunityIcons
              name={resultData.finalDecision === 'ALLOW' ? 'shield-check' : 'alert-outline'}
              size={48}
              color="#fff"
            />
          </View>
          <Text style={styles.resultTitle}>
            {resultData.finalDecision === 'ALLOW' ? 'Link is Safe' : 'Danger Detected'}
          </Text>
          <Text style={styles.resultVerdict}>{resultData.verdict}</Text>
          {resultData.finalDecision !== 'ALLOW' && (
            <View style={styles.riskBadge}>
              <MaterialCommunityIcons name="alert" size={14} color="#fff" />
              <Text style={styles.riskBadgeText}>Risk Score {resultData.finalRiskScore}%</Text>
            </View>
          )}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionLabelHeader}>AI ANALYSIS SUMMARY</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryIconBox}>
              <MaterialCommunityIcons name="credit-card" size={20} color="#dc2626" />
            </View>
            <View style={styles.summaryContent}>
              {/* <Text style={styles.summaryCategory}>555</Text> */}
                <Text style={styles.summaryCategory}>{resultData.originalInput}</Text>
              <View style={styles.impersonatingRow}>
                <Text style={styles.impersonatingLabel}>type: {resultData.type}</Text>
              </View>
            </View>
          </View>
        </View>

        {resultData.finalDecision !== 'ALLOW'&& (
        <View style={styles.evidenceCard}>
          <View style={styles.evidenceHeader}>
            <Text style={styles.sectionLabel}>EVIDENCE DETAILS</Text>
            <Text style={styles.aiDetectedBadge}>AI Detected</Text>
          </View>
          {resultData.llmAnalysis?.analysis?.evidence?.map((e: any, idx: number) => (
            <View key={idx} style={styles.evidenceItem}>
              <View style={styles.evidenceIconBox}>
                <MaterialCommunityIcons name="alert-circle" size={32} color="#ef4444" />
              </View>
              <View style={styles.evidenceContent}>
                <Text style={styles.evidenceTitle}>{e.type}</Text>
                <Text style={styles.evidenceDesc}>{e.description}</Text>
              </View>
            </View>
          ))}
        </View>)}

        {resultData.finalDecision !== 'ALLOW' && resultData.llmAnalysis?.recommendations && resultData.llmAnalysis.recommendations.length > 0 && (
          <View style={styles.guideCard}>
            <View style={styles.evidenceHeader}>
            <Text style={styles.sectionLabel}>RECOMMENDATIONS</Text>
          </View>
            {resultData.llmAnalysis.recommendations.map((rec: string, i: number) => (
              <View key={i} style={styles.guideItem}>
                <View style={styles.guideNumber}>
                  <Text style={styles.guideNumberText}>{i + 1}</Text>
                </View>
                <View style={styles.guideContent}>
                  <Text style={styles.guideDesc}>{rec}</Text>
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
        <TouchableOpacity style={styles.btnDisable}
        disabled={true}>
          <Text style={styles.btnTextWhite}>
            {/* {resultData.finalDecision !== 'ALLOW' ? 'coming soon' : 'Open Browser'} */}
            coming soon
            {/* {resultData.finalDecision !== 'ALLOW' ? 'Block & Report' : 'Open Browser'} */}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
