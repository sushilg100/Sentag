
import { Review, Sentiment, RiskLevel } from './types';

const sources = [
  'Salesforce Feedback App', 'ServiceNow Portal', 'Internal Slack Audit', 
  'Executive Quarterly Review', 'Beta Cohort Survey', 'Gartner Peer Insights', 
  'Direct Client Interview', 'Zendesk Ticket #8821', 'NPS Response', 'CSAT Survey',
  'Field Engineering Report', 'Product Council Feedback', 'Logistics Audit'
];

interface Template {
  productId: string;
  text: string;
  aspect: string;
  sentiment: Sentiment;
  rating: number;
  riskReason?: string;
  importance: number;
}

const generateProductSpecificTemplates = (): Template[] => {
  const templates: Template[] = [];

  // --- LUMINA Z1 TITANIUM (SMARTPHONE) ---
  const phonePains = [
    { a: "Thermal Management", t: "The Titanium frame is conducting too much heat during 8K neural video processing. Handheld comfort is compromised.", r: "Hardware thermal throttling detected.", i: 0.95 },
    { a: "Neural Processing", t: "Sentag Core NPU is stuttering when running local LLMs alongside 5G radio sync.", r: "Computational bottleneck in edge-AI.", i: 0.88 },
    { a: "Biometrics", t: "Under-display secure enclave fails to recognize fingerprints when the screen is in direct sunlight.", r: "Biometric authentication failure cohort.", i: 0.92 },
    { a: "Battery Optimization", t: "Predictive battery management is being too aggressive, killing background enterprise apps unexpectedly.", r: "SaaS background sync instability.", i: 0.85 },
    { a: "Display Tech", t: "Noticed slight OLED color shift at the 120Hz refresh peak. Sub-pixel rendering seems off.", r: "Panel quality variance.", i: 0.75 },
    { a: "Connectivity", t: "Wi-Fi 7 handoff in high-density office environments is dropping packets during VOIP calls.", r: "Network stack instability.", i: 0.90 },
    { a: "Build Integrity", t: "The Titanium edge is already showing micro-abrasions after just one week of pocket use.", r: "Material durability concern.", i: 0.60 },
    { a: "Audio Fidelity", t: "Internal speaker resonance at high volumes causes the back plate to vibrate noticeably.", r: "Acoustics engineering flaw.", i: 0.45 },
    { a: "Vision Engine", t: "Night mode synthesis is over-sharpening faces, creating an uncanny valley effect in corporate portraits.", r: "Imaging algorithm bias.", i: 0.70 },
    { a: "Storage I/O", t: "Encrypted file transfer speeds are significantly slower than advertised UFS 4.0 specs.", r: "Flash controller throughput bottleneck.", i: 0.80 },
    { a: "NPU Heat", t: "Using the real-time translation module for more than 10 mins makes the top-left corner untouchable.", r: "Localized thermal concentration.", i: 0.93 },
    { a: "Kernel Logic", t: "Cold boot times have increased since the latest security patch. Kernel initialization is lagging.", r: "Boot-loader optimization regression.", i: 0.65 },
    { a: "Haptics", t: "The haptic motor feels 'mushy' compared to the Z1 prototype. Lacks the crisp tactile feedback expected.", r: "Component sourcing inconsistency.", i: 0.55 },
    { a: "Microphone Array", t: "Background noise cancellation is muffling the primary speaker in windy outdoor conditions.", r: "Beamforming algorithm error.", i: 0.78 },
    { a: "Satellite SOS", t: "Emergency satellite link failed to acquire lock in an open field during our field test.", r: "Critical safety hardware failure.", i: 0.99 }
  ];

  const phoneWins = [
    { a: "Vision Engine", t: "The 48MP processed frames are stunning. The real-time synthesis handles low light better than my DSLR.", i: 0.94 },
    { a: "Hardware Design", t: "The Titanium build feels incredibly premium and light. It's the first phone that feels like a true enterprise tool.", i: 0.80 },
    { a: "5G Connectivity", t: "Modem analytics are proving correct; I'm getting better signal in dead zones than with any other flagship.", i: 0.88 },
    { a: "NPU Performance", t: "Running local Llama models on-device is seamless. Zero latency in our proprietary AI workflows.", i: 0.96 },
    { a: "Battery Life", t: "Even with the 120Hz display maxed out, I'm ending the day with 40%. The efficiency is unparalleled.", i: 0.85 },
    { a: "Enterprise Security", t: "The remote wipe and secure partition features integrated perfectly with our MDM suite.", i: 0.98 },
    { a: "Display Tech", t: "Peak brightness in direct sunlight is incredible. Best visibility I've seen on a mobile panel.", i: 0.82 }
  ];

  // --- AURA WATCH ULTRA (WEARABLE) ---
  const watchPains = [
    { a: "Sensor Accuracy", t: "SpO2 readings are spiking inconsistently during high-intensity interval training. Bio-Aspect sensor needs calibration.", r: "Clinical data integrity alert.", i: 0.97 },
    { a: "Sync Latency", t: "Bluetooth LE sync to the mobile proxy is taking over 30 seconds for nightly sleep logs.", r: "Data pipeline latency breach.", i: 0.82 },
    { a: "GSR Stress Logic", t: "The stress monitor flagged me as 'Critical' during a normal board meeting. Too many false positives.", r: "Algorithm confidence variance high.", i: 0.88 },
    { a: "Ergonomics", t: "The medical-grade strap is causing skin irritation in about 5% of our test cohort users.", r: "Product safety/UX risk identified.", i: 0.75 },
    { a: "Heart Rate Logic", t: "HRV data is missing segments during deep sleep cycles. The sensor seems to lose lock.", r: "Biometric signal dropout.", i: 0.91 },
    { a: "App Ecosystem", t: "Third-party fitness apps are crashing the watchOS kernel when accessing the raw sensor stream.", r: "OS sandbox stability issue.", i: 0.68 },
    { a: "Battery Drain", t: "Continuous GPS tracking kills the battery in under 4 hours. Unacceptable for ultra-marathoners.", r: "Power profile inefficiency.", i: 0.85 },
    { a: "Display Durability", t: "The sapphire glass scratched during a standard climbing session. Hardness rating questioned.", r: "Materials claim discrepancy.", i: 0.72 },
    { a: "Charger Magnet", t: "The inductive charging puck keeps disconnecting. The magnetic alignment is too weak.", r: "Accessory mechanical failure.", i: 0.50 },
    { a: "Audio Quality", t: "Voice calls via the watch speaker are tinny and distorted in loud environments.", r: "Speaker driver limitation.", i: 0.40 },
    { a: "Altimeter Sync", t: "Altitude readings are off by 50 meters compared to professional barometric gear.", r: "Environmental sensor calibration error.", i: 0.77 },
    { a: "User Interface", t: "The digital crown lacks the tactical click-feel of the previous model. Feels cheap.", r: "Mechanical UX regression.", i: 0.58 },
    { a: "Water Resistance", t: "Condensation appeared under the glass after a 2-meter pool session. Seal failure.", r: "IP-rating breach / Manufacturing defect.", i: 0.94 },
    { a: "Emergency SOS", t: "Fall detection triggered while I was just clapping. Calibration is too sensitive.", r: "Safety feature false positive.", i: 0.83 },
    { a: "Data Privacy", t: "Local health data was visible to a guest user via the lock-screen complication. Major flaw.", r: "Privacy/Security vulnerability.", i: 0.99 }
  ];

  const watchWins = [
    { a: "Sleep Logic", t: "The circadian rhythm tracking is frighteningly accurate. It correctly identified my burnout phase before I did.", i: 0.90 },
    { a: "Battery Longevity", t: "Getting a full 72 hours even with continuous biosensor vectoring active. Incredible engineering.", i: 0.85 },
    { a: "Enterprise Wellness", t: "The API integration with our corporate health portal was seamless. Our engagement is up 40%.", i: 0.95 },
    { a: "Build Quality", t: "The aerospace-grade housing has survived multiple drops on concrete with zero marks.", i: 0.78 },
    { a: "Bio-Aspect Sensor", t: "Consistent readings that match our clinical EKG equipment almost perfectly.", i: 0.98 },
    { a: "Workout Modes", t: "The automatic exercise detection is the fastest I've tested. It knows I'm rowing within 5 seconds.", i: 0.82 },
    { a: "Glanceable UI", t: "The high-contrast complications make it so easy to check my vitals during a run.", i: 0.75 }
  ];

  // --- SENTAG CLOUD APP (SAAS) ---
  const appPains = [
    { a: "Synthesis Engine", t: "Cross-platform data aggregation is missing metadata fields from our custom Salesforce objects.", r: "Data ingestion incompleteness.", i: 0.94 },
    { a: "Collaboration API", t: "Websocket collisions are causing 'ghost' comments in shared executive workspaces.", r: "State synchronization failure.", i: 0.88 },
    { a: "Vector DB Search", t: "Semantic search is returning irrelevant results for specific industry jargon in our niche.", r: "RAG retrieval precision decay.", i: 0.85 },
    { a: "LLM Hallucination", t: "The 'Insight Gen' feature synthesized a growth trend that isn't supported by the raw CSV data.", r: "Executive reporting integrity risk.", i: 0.98 },
    { a: "Performance", t: "The dashboard takes over 8 seconds to load when filtering datasets larger than 1M rows.", r: "Frontend render bottleneck.", i: 0.80 },
    { a: "Auth Integration", t: "SAML SSO handshake fails intermittently with Azure AD during peak morning traffic.", r: "Auth protocol timeout.", i: 0.92 },
    { a: "Data Export", t: "PDF reports are losing chart legends when exported in landscape mode.", r: "Report generator UI bug.", i: 0.55 },
    { a: "User Permissions", t: "A 'Viewer' role was able to modify a product profile. Serious privilege escalation bug.", r: "RBAC security vulnerability.", i: 0.99 },
    { a: "Mobile Proxy", t: "The companion app is crashing on iOS 18 when attempting to view the risk center.", r: "App stability regression.", i: 0.83 },
    { a: "API Rate Limits", t: "The 500 rps limit is too low for our high-frequency ingestion needs. We are being throttled.", r: "Infrastructure scalability cap.", i: 0.87 },
    { a: "Schema Mapping", t: "Manual CSV import doesn't recognize our date formats (DD/MM/YYYY). All timestamps failed.", r: "Parser localization error.", i: 0.70 },
    { a: "Visual Analytics", t: "The radar charts are overlapping when more than 6 metrics are selected. Hard to read.", r: "Viz component layout failure.", i: 0.45 },
    { a: "Search Indexing", t: "New reviews take up to 2 hours to appear in the 'Aspect Matrix' view. Too slow.", r: "Index pipeline latency.", i: 0.81 },
    { a: "Compliance Audit", t: "The audit log isn't capturing the IP addresses of users performing bulk deletions.", r: "Governance tracking gap.", i: 0.95 },
    { a: "LLM Reasoning", t: "Sentag AI suggested we 'ignore' a cluster of negative reviews instead of prioritizing them.", r: "Recommendation engine bias.", i: 0.89 }
  ];

  const appWins = [
    { a: "Executive Insights", t: "I generated a boardroom-ready brief in 10 seconds. This used to take my team three days of manual work.", i: 0.96 },
    { a: "n8n Orchestration", t: "The workflow automation between Zendesk and our product roadmap is a work of art.", i: 0.92 },
    { a: "Command Console UX", t: "The signal-to-noise ratio in this dashboard is perfect. I finally see the 'why' behind the churn.", i: 0.88 },
    { a: "Semantic Search", t: "Searching for 'thermal complaints' instantly pulled every relevant review across 4 years of data.", i: 0.90 },
    { a: "Vector Analytics", t: "The ability to see sentiment distribution by region has completely changed our expansion strategy.", i: 0.85 },
    { a: "SLA Reliability", t: "99.99% uptime is real. We haven't had a single outage during our heavy Q3 reporting cycle.", i: 0.94 },
    { a: "Customer Support", t: "The technical support team resolved our complex API mapping issue in under two hours.", i: 0.80 }
  ];

  const processCategory = (productId: string, pains: any[], wins: any[]) => {
    // Generate negative variations
    pains.forEach((p, idx) => {
      // Direct Pain
      templates.push({
        productId,
        text: `[CRITICAL VEC] ${p.t}`,
        aspect: p.a,
        sentiment: Sentiment.NEGATIVE,
        rating: 1,
        riskReason: p.r,
        importance: p.i
      });
      // Nuanced Friction
      templates.push({
        productId,
        text: `Testing the ${p.a} module. ${p.t.split('.')[0]}. Not what I expected for a flagship.`,
        aspect: p.a,
        sentiment: Sentiment.NEGATIVE,
        rating: 2,
        riskReason: `Potential ${p.a} instability.`,
        importance: p.i * 0.9
      });
      // Neutral observation of pain
      templates.push({
        productId,
        text: `The ${p.a} behavior is unusual. ${p.t.substring(0, 50)}... requiring further internal audit.`,
        aspect: p.a,
        sentiment: Sentiment.NEUTRAL,
        rating: 3,
        riskReason: "Standard operational variance.",
        importance: p.i * 0.7
      });
    });

    // Generate positive variations
    wins.forEach((w, idx) => {
      // Direct Win
      templates.push({
        productId,
        text: `${w.t} This is a game changer for our business.`,
        aspect: w.a,
        sentiment: Sentiment.POSITIVE,
        rating: 5,
        importance: w.i
      });
      // Moderate Win
      templates.push({
        productId,
        text: `Solid results on ${w.a}. ${w.t.split('.')[0]}. Definitely an improvement over the last build.`,
        aspect: w.a,
        sentiment: Sentiment.POSITIVE,
        rating: 4,
        importance: w.i * 0.85
      });
    });
  };

  processCategory('P-PHONE', phonePains, phoneWins);
  processCategory('P-WATCH', watchPains, watchWins);
  processCategory('P-APP', appPains, appWins);

  return templates;
};

export const generateSampleData = (): Review[] => {
  const reviews: Review[] = [];
  const now = new Date();
  const pool = generateProductSpecificTemplates();

  // We want to generate ~500 reviews to ensure the dashboard feels populated and diverse
  const totalReviews = 550;
  
  for (let i = 0; i < totalReviews; i++) {
    // Randomly pick from the pool to ensure non-sequential patterns
    const template = pool[Math.floor(Math.random() * pool.length)];
    const daysAgo = Math.floor(Math.random() * 120);
    const timestamp = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
    
    const sentiment = template.sentiment;
    const rating = template.rating;
    
    // SSQ Score calculation logic (Normalized 0-100)
    let score = 50;
    if (rating === 5) score = 90 + Math.random() * 10;
    else if (rating === 4) score = 75 + Math.random() * 15;
    else if (rating === 3) score = 40 + Math.random() * 30;
    else if (rating === 2) score = 20 + Math.random() * 25;
    else if (rating === 1) score = 5 + Math.random() * 20;

    // Additional randomization to text to avoid exact duplicates
    const variations = ["", " [AUDIT_COMPLETE]", " - Verified.", " (Draft)", " !!!", "..."];
    const textSuffix = variations[Math.floor(Math.random() * variations.length)];
    const finalReviewText = template.text + textSuffix;

    reviews.push({
      id: `VEC-${30000 + i}`,
      productId: template.productId,
      text: finalReviewText,
      rating: rating,
      timestamp,
      source: sources[Math.floor(Math.random() * sources.length)],
      analysis: {
        sentiment: sentiment,
        score: Math.round(score),
        confidence: 0.85 + Math.random() * 0.14,
        breakdownText: `━━━━━━━━━━━━━━━━━━━━━━\nSENTIMENT METRICS BREAKDOWN\n━━━━━━━━━━━━━━━━━━━━━━\n• Context Index: ${template.productId}\n• Vector Focus: ${template.aspect}\n• Derived SSQ: ${Math.round(score)}/100\n• Signal Polarity: ${sentiment === Sentiment.POSITIVE ? 'Constructive' : (sentiment === Sentiment.NEGATIVE ? 'Frictional' : 'Neutral')}\n• Audit Confidence: ${(0.85 + Math.random() * 0.1).toFixed(2)}\n━━━━━━━━━━━━━━━━━━━━━━`,
        emotions: {
          'Joy': sentiment === Sentiment.POSITIVE ? 0.7 : 0.05,
          'Trust': sentiment === Sentiment.POSITIVE ? 0.85 : 0.15,
          'Frustration': sentiment === Sentiment.NEGATIVE ? 0.8 : 0.1,
          'Anger': (sentiment === Sentiment.NEGATIVE && rating === 1) ? 0.6 : 0.02
        },
        aspects: [
          {
            name: template.aspect,
            sentiment: sentiment === Sentiment.POSITIVE ? 0.9 : (sentiment === Sentiment.NEGATIVE ? -0.9 : 0.1),
            importance: template.importance,
            mentions: 1
          },
          {
            name: "Enterprise Scalability",
            sentiment: rating >= 4 ? 0.7 : (rating <= 2 ? -0.5 : 0.0),
            importance: 0.8,
            mentions: 1
          }
        ],
        risks: {
          churn: score < 35 ? RiskLevel.HIGH : (score < 60 ? RiskLevel.MEDIUM : RiskLevel.LOW),
          brand: (sentiment === Sentiment.NEGATIVE && template.importance > 0.9) ? RiskLevel.HIGH : RiskLevel.LOW,
          support: (template.aspect.includes("Sync") || template.aspect.includes("Auth") || template.aspect.includes("SOS")) && sentiment === Sentiment.NEGATIVE ? RiskLevel.MEDIUM : RiskLevel.LOW,
          reason: template.riskReason || "Behavioral baseline within nominal range."
        }
      }
    });
  }

  // Sort by date descending
  return reviews.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
