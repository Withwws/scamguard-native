import { MaterialCommunityIcons } from '@expo/vector-icons';

export const SCENARIOS = {
  financial: {
    type: 'SCAM',
    url: 'https://bit.ly/prize-claim',
    verdict: 'This link impersonates a legitimate financial institution to steal credentials and payment information.',
    riskScore: 94,
    category: 'Financial Phishing',
    impersonating: 'PayPal',
    serverLoc: 'Unknown (Russia)',
    evidence: [
      {
        icon: (props: any) => <MaterialCommunityIcons name="link-variant" {...props} />,
        title: 'Suspicious URL shortener',
        desc: 'Uses bit.ly to hide actual destination',
      },
      {
        icon: (props: any) => <MaterialCommunityIcons name="certificate" {...props} />,
        title: 'Invalid SSL certificate',
        desc: 'Certificate does not match claimed domain',
      },
      {
        icon: (props: any) => <MaterialCommunityIcons name="text-box-check" {...props} />,
        title: 'Fake login form detected',
        desc: 'Password field sends data to unknown server',
      },
    ],
    actionGuide: [
      {
        title: 'Do NOT enter any credentials',
        text: 'Never input passwords or personal information on this site.',
      },
      {
        title: 'Report to your bank',
        text: 'Contact PayPal or your financial institution immediately.',
      },
      {
        title: 'Change passwords',
        text: 'If you entered any information, change your passwords now.',
      },
    ],
    reportStats: {
      monthlyReports: 1847,
      similarCases: '2.3k',
      trend: '↑ 23%',
    },
  },
  malware: {
    type: 'SCAM',
    url: 'https://tinyurl.com/urgent-update',
    verdict: 'This link attempts to install malware disguised as a software update.',
    riskScore: 89,
    category: 'Malware Distribution',
    impersonating: 'System Update',
    serverLoc: 'Ukraine',
    evidence: [
      {
        icon: (props: any) => <MaterialCommunityIcons name="download" {...props} />,
        title: 'Malicious download',
        desc: 'Attempts to download suspicious .apk file',
      },
      {
        icon: (props: any) => <MaterialCommunityIcons name="shield-alert" {...props} />,
        title: 'Known malware signature',
        desc: 'File matches known trojan patterns',
      },
      {
        icon: (props: any) => <MaterialCommunityIcons name="account-lock" {...props} />,
        title: 'Requests dangerous permissions',
        desc: 'Asks for SMS, contacts, and storage access',
      },
    ],
    actionGuide: [
      {
        title: 'Do NOT download',
        text: 'Never install apps from unknown sources.',
      },
      {
        title: 'Scan your device',
        text: 'Run a security scan if you already downloaded.',
      },
      {
        title: 'Report the link',
        text: 'Submit to your security provider or authorities.',
      },
    ],
    reportStats: {
      monthlyReports: 943,
      similarCases: '1.2k',
      trend: '↑ 15%',
    },
  },
  safe: {
    type: 'SAFE',
    url: 'https://www.google.com',
    verdict: 'This link appears to be legitimate and safe to visit.',
    riskScore: 2,
    category: 'Legitimate Website',
    impersonating: 'None',
    serverLoc: 'United States',
    evidence: [
      {
        icon: (props: any) => <MaterialCommunityIcons name="check-circle" {...props} />,
        title: 'Valid SSL certificate',
        desc: 'Certificate verified by trusted authority',
      },
      {
        icon: (props: any) => <MaterialCommunityIcons name="domain" {...props} />,
        title: 'Verified domain',
        desc: 'Registered to legitimate organization',
      },
      {
        icon: (props: any) => <MaterialCommunityIcons name="shield-check" {...props} />,
        title: 'No threats detected',
        desc: 'Clean scan across all security databases',
      },
    ],
  },
};
