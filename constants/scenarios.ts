import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

export const SCENARIOS = {
  financial: {
    url: 'amazon-prime-gift.xyz',
    type: 'DANGER',
    category: 'Financial Fraud & Phishing',
    impersonating: 'Amazon',
    verdict: 'Phishing site impersonating Amazon to steal credit card details.',
    riskScore: 98,
    serverLoc: '🇨🇳 China (Alibaba Cloud)',
    reportStats: { monthlyReports: 856, similarCases: '45 cases confirmed', trend: 'Spiking' },
    actionGuide: [
      { title: 'Secure Your Account', text: 'Change your password immediately if you entered it.' },
      { title: 'Prevent Financial Loss', text: 'Contact your bank to freeze your card if details were shared.' },
      { title: 'Check Subscriptions', text: 'Verify no unauthorized subscriptions were made via carrier.' },
    ],
    evidence: [
      { icon: (p: any) => React.createElement(MaterialCommunityIcons, { name: 'credit-card-outline', ...p }), title: 'Fake Payment Gateway', desc: 'AI detected a non-official payment form sending data to an unknown server.' },
      { icon: (p: any) => React.createElement(Feather, { name: 'mouse-pointer', ...p }), title: 'Honey Token Bypassed', desc: 'AI entered fake card details, but the site accepted them as valid.' },
      { icon: (p: any) => React.createElement(FontAwesome5, { name: 'globe', ...p }), title: 'Domain Mismatch', desc: 'URL does not match official domain (amazon.com).' },
    ],
  },
  malware: {
    url: 'dhl-delivery-status.apk.net',
    type: 'CRITICAL',
    category: 'Malware Delivery',
    impersonating: 'DHL Express',
    verdict: 'Attempts to auto-download malicious APK disguised as DHL app.',
    riskScore: 99,
    serverLoc: '🇷🇺 Russia (Private Server)',
    reportStats: { monthlyReports: 210, similarCases: '12 cases confirmed', trend: 'Rising' },
    actionGuide: [
      { title: 'Delete Malicious App', text: 'Delete any downloaded APK files immediately.' },
      { title: 'Cut Network Connection', text: 'Switch to Airplane Mode to block hacker communication.' },
      { title: 'Run Antivirus Scan', text: 'Perform a deep scan using a trusted mobile antivirus.' },
    ],
    evidence: [
      { icon: (p: any) => React.createElement(MaterialCommunityIcons, { name: 'file-alert', ...p }), title: 'Drive-by Download Detected', desc: "Site triggered auto-download of 'DHL_Update.apk' upon entry." },
      { icon: (p: any) => React.createElement(MaterialCommunityIcons, { name: 'server', ...p }), title: 'C&C Server Traffic', desc: 'Detected traffic to a known Botnet Command & Control server.' },
    ],
  },
  safe: {
    url: 'www.google.com',
    type: 'SAFE',
    category: 'Legitimate Site',
    impersonating: 'None',
    verdict: 'Official SSL certificate and domain verified.',
    riskScore: 1,
    serverLoc: '🇺🇸 USA (Google LLC)',
    reportStats: null,
    actionGuide: null,
    evidence: [
      { icon: (p: any) => React.createElement(MaterialCommunityIcons, { name: 'shield-check', ...p }), title: 'Valid SSL Certificate', desc: 'Verified security certificate issued by Google Trust Services.' },
      { icon: (p: any) => React.createElement(Feather, { name: 'activity', ...p }), title: 'No Malicious Activity', desc: 'No auto-downloads or suspicious redirects detected.' },
    ],
  },
};
