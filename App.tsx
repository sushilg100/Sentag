
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, MessageSquare, BarChart3, AlertTriangle, Settings, PieChart, 
  FileText, Cpu, ArrowUpRight, RefreshCw, Send, ChevronRight, Layers, Activity, 
  Zap, X, Plus, ArrowRight, Download, AlertCircle, Filter, TrendingUp, Search, 
  Database, ShieldAlert, ChevronUp, ChevronDown, Loader2, Info, Box, Server, 
  Target, Monitor, Smartphone, Watch, Globe, Home, Eye, Car, CheckCircle2,
  TrendingDown, Minus, BarChart as BarChartIcon, Target as TargetIcon, 
  ShieldCheck, Clock, Gauge, Binary, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  LineChart, Line, Legend, Sector
} from 'recharts';
import { Review, Tab, Sentiment, RiskLevel, ProductProfile } from './types';
import { generateSampleData } from './sampleData';
import { GeminiService } from './geminiService';

const UI_COLORS = {
  Deep: '#0F1115',
  Slate: '#161A22',
  SoftWhite: '#F8F9FB',
  CoolGray: '#C7CBD6',
  Positive: '#3A7D44',
  Warning: '#C58B2A',
  Critical: '#B5474F',
  Focus: '#4C5C8A'
};

const SAMPLE_PRODUCTS: ProductProfile[] = [
  {
    id: 'P-PHONE',
    name: 'Lumina Z1 Titanium',
    category: 'Hardware / Mobile',
    tagline: 'Next-Gen Neural Smartphone',
    description: 'The Lumina Z1 is a flagship mobile device engineered for peak performance. Featuring a 6.9-inch Titanium-encased display and the Sentag Core NPU for real-time edge processing.',
    modules: [
      { title: 'Vision Engine', desc: 'Real-time image synthesis and NPU optimization.', input: 'Camera sensor raw stream', output: '48MP Processed Frame' },
      { title: 'Kernel Optimization', desc: 'Predictive battery management and app scheduling.', input: 'Usage telemetry', output: 'Resource Allocation Plan' },
      { title: 'Security Vault', desc: 'Biometric hashing and encrypted secure enclave.', input: 'Face/Fingerprint scan', output: 'Auth Token' },
      { title: 'Modem Analytics', desc: '5G spectrum analysis and carrier prioritization.', input: 'Radio signal data', output: 'Network Quality Index' }
    ],
    architecture: 'Device data is ingested via encrypted local listeners, routed through the Sentag Edge NPU for primary vectoring, and periodically synced to the Cloud Intelligence layer for long-term cohort analysis.',
    capabilities: ['Neural Signal Processing', 'Edge-Based Sentiment Analysis', 'Predictive Hardware Failure Detection', 'Contextual Biometric Security'],
    impacts: [
      { title: 'Churn Reduction', text: 'Identify hardware friction points before they lead to customer returns.' },
      { title: 'Revenue Expansion', text: 'Target pro users for camera accessory upsells based on usage patterns.' },
      { title: 'Brand Loyalty', text: 'Deliver personalized performance tuning based on individual user intent.' }
    ],
    metrics: [
      { label: 'Uptime', value: '99.98%', trend: '+0.01%' },
      { label: 'Latency', value: '12ms', trend: '-2ms' },
      { label: 'Retain', value: '94%', trend: '+2%' }
    ],
    uxDescription: 'The Lumina Z1 interface prioritizes tactile feedback and OLED black-level optimization. Navigation is driven by haptic-assisted gestures and gaze-contingent UI scaling.',
    whyMatters: 'As mobile becomes the primary vector for enterprise data entry, the Z1 provides the secure, AI-native hardware required for the next decade of mobile work.'
  },
  {
    id: 'P-WATCH',
    name: 'Aura Watch Ultra',
    category: 'Hardware / Wearable',
    tagline: 'Medical-Grade Health Intelligence',
    description: 'A dedicated health monitoring wearable designed for enterprise wellness programs and medical researchers. Includes the patented Bio-Aspect sensor array.',
    modules: [
      { title: 'Biometric Core', desc: 'Continuous heart rate and blood oxygen vectoring.', input: 'Photoplethythysmography sensor', output: 'BPM / SpO2 Index' },
      { title: 'Sleep Logic', desc: 'Dynamic stage analysis and circadian rhythm tracking.', input: 'Motion + HR data', output: 'Sleep Score' },
      { title: 'Stress Monitor', desc: 'Galvanic skin response analysis for real-time stress detection.', input: 'GSR sensor data', output: 'Cortisol Intensity Level' },
      { title: 'Alert Engine', desc: 'Autonomous emergency dispatch and relative notification.', input: 'Anomaly threshold breach', output: 'SOS Signal' }
    ],
    architecture: 'High-frequency sensor data is condensed on-device using quantized models, then streamed via Bluetooth LE to the mobile proxy for full cloud synthesis and risk reporting.',
    capabilities: ['Continuous Biosensor Analytics', 'Anomaly Detection Algorithms', 'Enterprise Wellness Insights', 'Predictive Burnout Indicators'],
    impacts: [
      { title: 'Health Outcomes', text: 'Reduce emergency incidents through early anomaly detection.' },
      { title: 'Employee Engagement', text: 'Improve wellness program participation with empirical progress data.' },
      { title: 'Product Market Fit', text: 'Tailor sensor sensitivity based on professional athlete feedback.' }
    ],
    metrics: [
      { label: 'Accuracy', value: '98.4%', trend: '+0.5%' },
      { label: 'Battery', value: '72h', trend: 'Stable' },
      { label: 'Users', value: '1.2M', trend: '+12%' }
    ],
    uxDescription: 'The Aura UI is designed for glanceability. We utilize circular progress rings and high-contrast complication tiles to deliver critical health stats in under 500ms.',
    whyMatters: 'The Aura Watch Ultra transforms the wearable from a toy into a legitimate clinical tool, enabling preventative care at enterprise scale.'
  },
  {
    id: 'P-APP',
    name: 'Sentag Cloud App',
    category: 'Software / SaaS',
    tagline: 'Enterprise Product Intelligence Platform',
    description: 'The core dashboard and analysis platform for high-growth enterprise teams. Centralizes all customer signals into a unified boardroom-ready interface.',
    modules: [
      { title: 'Synthesis Engine', desc: 'Cross-platform data aggregation and normalization.', input: 'API/CSV/Manual inputs', output: 'Unified Intel Vector' },
      { title: 'Collaborate API', desc: 'Real-time multi-user synchronization and comment threading.', input: 'Websocket events', output: 'Shared Workspace State' },
      { title: 'Insight Gen', desc: 'LLM-powered executive report synthesis.', input: 'Aggregated analytics', output: 'Strategic Brief' },
      { title: 'Vector DB', desc: 'High-dimensional storage for semantic search.', input: 'Unstructured text', output: 'Embedding Indices' }
    ],
    architecture: 'Built on an event-driven microservices architecture using n8n for workflow orchestration and Gemini 3 Pro for the advanced reasoning and intelligence layer.',
    capabilities: ['Multi-Source Signal Ingestion', 'Real-Time Sentiment Vectoring', 'Strategic Churn Prediction', 'Automated Roadmap Prioritization'],
    impacts: [
      { title: 'Operational Speed', text: 'Reduce reporting cycles from weeks to minutes.' },
      { title: 'Strategic Alignment', text: 'Ensure product roadmaps are tied to high-importance customer aspects.' },
      { title: 'Risk Mitigation', text: 'Detect and resolve support bottlenecks before they escalate.' }
    ],
    metrics: [
      { label: 'Throughput', value: '500 rps', trend: '+10%' },
      { label: 'SLA', value: '99.99%', trend: 'Stable' },
      { label: 'Churn', value: '1.2%', trend: '-0.3%' }
    ],
    uxDescription: 'The Cloud App uses a "Command Console" philosophy. Dark-mode by default to reduce eye strain, with data visualizations that prioritize "Signal over Noise" using tiered information hierarchy.',
    whyMatters: 'In an era of data overload, Sentag Cloud is the filter that allows executives to find the truth hidden within 100,000+ monthly customer feedback points.'
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SHOWCASE);
  const [selectedProductId, setSelectedProductId] = useState<string>(SAMPLE_PRODUCTS[0].id);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [report, setReport] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [ingestionPreview, setIngestionPreview] = useState<string | null>(null);
  const [enterpriseBreakdown, setEnterpriseBreakdown] = useState<string | null>(null);
  const [showRefreshConfirm, setShowRefreshConfirm] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [batchProgress, setBatchProgress] = useState<{ current: number, total: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aiService = useMemo(() => new GeminiService(), []);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReviews(generateSampleData());
  }, []);

  const selectedProduct = useMemo(() => 
    SAMPLE_PRODUCTS.find(p => p.id === selectedProductId) || SAMPLE_PRODUCTS[0]
  , [selectedProductId]);

  const stats = useMemo(() => {
    if (!reviews.length) return null;
    const activeReviews = reviews.filter(r => !dismissedIds.has(r.id) && r.productId === selectedProductId);
    const totalCount = activeReviews.length;
    if (totalCount === 0) return null;

    const pos = activeReviews.filter(r => r.analysis.sentiment === Sentiment.POSITIVE).length;
    const neg = activeReviews.filter(r => r.analysis.sentiment === Sentiment.NEGATIVE).length;
    const neu = activeReviews.filter(r => r.analysis.sentiment === Sentiment.NEUTRAL).length;
    
    const highRiskReviews = activeReviews.filter(r => {
      const risks = r.analysis.risks;
      return (
        r.analysis.score < 40 || 
        (risks?.churn && risks.churn !== RiskLevel.LOW) || 
        (risks?.brand && risks.brand !== RiskLevel.LOW) ||
        (risks?.support && risks.support !== RiskLevel.LOW)
      );
    }).sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    const scores = activeReviews.map(r => r.analysis.score);
    const avgScore = scores.reduce((acc, s) => acc + s, 0) / totalCount;
    const avgConfidence = activeReviews.reduce((acc, r) => acc + (r.analysis.confidence || 0), 0) / totalCount;

    const squareDiffs = scores.map(s => Math.pow(s - avgScore, 2));
    const variance = squareDiffs.reduce((acc, d) => acc + d, 0) / totalCount;
    const stdDev = Math.sqrt(variance);

    const sentimentIntensity = Math.max(0, Math.min(100, (pos / totalCount) * 100));
    const volumePrevalence = Math.max(0, Math.min(100, (totalCount / 300) * 100)); 
    const confidenceVariance = Math.max(0, Math.min(100, avgConfidence * 100));
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentReviews = activeReviews.filter(r => new Date(r.timestamp) > thirtyDaysAgo);
    const recentAvg = recentReviews.length > 0 
      ? recentReviews.reduce((acc, r) => acc + r.analysis.score, 0) / recentReviews.length
      : avgScore;
    const temporalStability = Math.max(0, 100 - (Math.abs(recentAvg - avgScore) * 5));

    const aspectMap: Record<string, { total: number, count: number, importance: number }> = {};
    activeReviews.forEach(r => {
      r.analysis.aspects?.forEach(a => {
        if (!aspectMap[a.name]) aspectMap[a.name] = { total: 0, count: 0, importance: 0 };
        aspectMap[a.name].total += a.sentiment;
        aspectMap[a.name].count += 1;
        aspectMap[a.name].importance = Math.max(aspectMap[a.name].importance, a.importance);
      });
    });

    const aspectData = Object.entries(aspectMap).map(([name, data]) => ({
      name,
      sentiment: Number((data.total / data.count).toFixed(2)),
      mentions: data.count,
      importance: data.importance
    })).sort((a, b) => b.mentions - a.mentions);

    return {
      healthScore: Math.round(avgScore),
      avgRating: (avgScore / 20).toFixed(1),
      avgConfidence,
      stdDev,
      temporalStability,
      sentimentIntensity,
      volumePrevalence,
      confidenceVariance,
      pos, neg, neu,
      total: totalCount,
      aspectData,
      sentimentDistribution: [
        { name: 'Positive', value: pos, color: UI_COLORS.Positive, pct: (pos / totalCount * 100).toFixed(2) },
        { name: 'Neutral', value: neu, color: UI_COLORS.Focus, pct: (neu / totalCount * 100).toFixed(2) },
        { name: 'Negative', value: neg, color: UI_COLORS.Critical, pct: (neg / totalCount * 100).toFixed(2) },
      ],
      highRiskReviews
    };
  }, [reviews, dismissedIds, selectedProductId]);

  const handleAddReview = async () => {
    if (!newReviewText.trim()) return;
    setIsProcessing(true);
    setEnterpriseBreakdown(null);
    try {
      const preview = await aiService.getIngestionPreview(newReviewText);
      setIngestionPreview(preview);

      const analysis = await aiService.analyzeReview(newReviewText);
      setEnterpriseBreakdown(analysis.breakdownText);

      const newReview: Review = {
        id: `R-${Date.now()}`,
        productId: selectedProductId,
        text: newReviewText,
        rating: analysis.sentiment === 'Positive' ? 5 : (analysis.sentiment === 'Negative' ? 1 : 3),
        timestamp: new Date().toISOString(),
        source: 'Manual Entry',
        analysis: analysis
      };
      
      setReviews(prev => [newReview, ...prev]);
    } catch (e) {
      console.error(e);
    }
    setIsProcessing(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setIngestionPreview(null);
    setEnterpriseBreakdown(null);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').map(row => row.trim()).filter(row => row.length > 0);
      
      let reviewsToProcess: string[] = [];
      const header = rows[0].toLowerCase();
      
      if (header.includes(',') || header.includes('text') || header.includes('review')) {
        const columns = rows[0].split(',');
        let textIndex = columns.findIndex(c => c.toLowerCase().includes('text') || c.toLowerCase().includes('review'));
        if (textIndex === -1) textIndex = 0;

        reviewsToProcess = rows.slice(1).map(row => {
          const cells = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          return (cells[textIndex] || '').replace(/^"|"$/g, '').trim();
        }).filter(t => t.length > 0);
      } else {
        reviewsToProcess = rows.filter(t => t.length > 0);
      }

      if (reviewsToProcess.length === 0) {
        setIsProcessing(false);
        return;
      }

      setBatchProgress({ current: 0, total: reviewsToProcess.length });
      
      const newBatch: Review[] = [];
      for (let i = 0; i < reviewsToProcess.length; i++) {
        setBatchProgress({ current: i + 1, total: reviewsToProcess.length });
        try {
          const analysis = await aiService.analyzeReview(reviewsToProcess[i]);
          newBatch.push({
            id: `B-${Date.now()}-${i}`,
            productId: selectedProductId,
            text: reviewsToProcess[i],
            rating: analysis.sentiment === 'Positive' ? 5 : (analysis.sentiment === 'Negative' ? 1 : 3),
            timestamp: new Date().toISOString(),
            source: 'CSV Import',
            analysis: analysis
          });
        } catch (err) {
          console.error(`Row ${i} processing failed:`, err);
        }
      }

      setReviews(prev => [...newBatch, ...prev]);
      setBatchProgress(null);
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.readAsText(file);
  };

  const handleGlobalRefresh = () => {
    setShowRefreshConfirm(false);
    setIsProcessing(true);
    setTimeout(() => {
      setReviews(generateSampleData());
      setDismissedIds(new Set());
      setReport(null);
      setChatHistory([]);
      setIngestionPreview(null);
      setEnterpriseBreakdown(null);
      setIsProcessing(false);
    }, 1000);
  };

  const SidebarItem = ({ icon: Icon, label, tab, isCollapsed }: { icon: any, label: string, tab: Tab, isCollapsed: boolean }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center space-x-3 px-6 py-4 transition-all duration-200 rounded-md mb-1 border-l-4 overflow-hidden whitespace-nowrap ${
        activeTab === tab 
          ? 'bg-[#4C5C8A]/10 text-[#F8F9FB] border-[#4C5C8A] font-semibold' 
          : 'text-[#C7CBD6] hover:text-[#F8F9FB] hover:bg-white/5 border-transparent'
      }`}
    >
      <Icon size={18} className={`shrink-0 ${activeTab === tab ? 'text-[#4C5C8A]' : 'text-zinc-500'}`} />
      {!isCollapsed && <span className="text-[11px] uppercase tracking-[0.15em] opacity-100 transition-opacity duration-300">{label}</span>}
    </button>
  );

  const getProductIcon = (id: string) => {
    switch(id) {
      case 'P-PHONE': return Smartphone;
      case 'P-WATCH': return Watch;
      case 'P-APP': return Globe;
      default: return Box;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#161A22] border border-[#1F242D] p-4 rounded-lg shadow-2xl">
          <p className="text-[12px] font-black uppercase text-white mb-2">{label || payload[0].payload.name}</p>
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-zinc-400">
              Sentiment Value: <span className={payload[0].value >= 0 ? 'text-[#3A7D44]' : 'text-[#B5474F]'}>
                {payload[0].value}
              </span>
            </p>
            {payload[0].payload.mentions && (
              <p className="text-[10px] font-mono text-zinc-500">Citations: {payload[0].payload.mentions}</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const getVectorStatus = (val: number) => {
    if (val >= 85) return "Saturated";
    if (val >= 60) return "Calibrated";
    if (val >= 40) return "Nominal";
    return "Volatile";
  };

  return (
    <div className="flex h-screen bg-[#0F1115] text-[#F8F9FB] overflow-hidden relative font-sans">
      <aside 
        className={`${isSidebarCollapsed ? 'w-20' : 'w-72'} bg-[#161A22] border-r border-[#1F242D] flex flex-col shrink-0 px-4 py-8 shadow-2xl z-20 transition-all duration-300 ease-in-out`}
      >
        <div className="mb-12 px-2 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#4C5C8A] flex items-center justify-center rounded-sm rotate-3 shadow-lg shadow-[#4C5C8A]/20 shrink-0">
                <Layers size={20} className="text-white" />
              </div>
              {!isSidebarCollapsed && (
                <span className="font-extrabold text-2xl tracking-tighter text-white uppercase opacity-100 transition-opacity duration-300">SENTAG</span>
              )}
            </div>
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-zinc-500 hover:text-[#4C5C8A] transition-colors p-1"
            >
              {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>
          {!isSidebarCollapsed && (
            <div className="mt-4 flex items-center space-x-2 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap opacity-100 transition-opacity duration-300">
              <Activity size={12} className="text-[#3A7D44]" />
              <span>Integrity: High Confidence</span>
            </div>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={Info} label="Platform Profile" tab={Tab.SHOWCASE} isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={MessageSquare} label="Review Ingestion" tab={Tab.INGESTION} isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={PieChart} label="Sentiment Spectrum" tab={Tab.SENTIMENT} isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={BarChart3} label="Aspect Matrix" tab={Tab.ASPECTS} isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={AlertTriangle} label="Risk Center" tab={Tab.RISKS} isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={RefreshCw} label="Score Engine" tab={Tab.SCORE} isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={FileText} label="Executive Insights" tab={Tab.EXECUTIVE} isCollapsed={isSidebarCollapsed} />
          <SidebarItem icon={Cpu} label="AI Terminal" tab={Tab.ASSISTANT} isCollapsed={isSidebarCollapsed} />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-[#1F242D] flex items-center justify-between px-10 shrink-0 bg-[#0F1115]/80 backdrop-blur-xl z-10">
          <div className="flex items-center space-x-4">
             <h1 className="text-xs font-black uppercase tracking-[0.2em] text-[#F8F9FB]">{activeTab}</h1>
             <ChevronRight size={14} className="text-zinc-600" />
             <span className="text-[10px] font-bold text-[#4C5C8A] uppercase tracking-widest">{selectedProduct.name}</span>
          </div>
          <div className="flex items-center space-x-6">
             {isProcessing && <Loader2 size={18} className="animate-spin text-[#4C5C8A]" />}
             <button onClick={() => setShowRefreshConfirm(true)} className="text-zinc-500 hover:text-white transition-colors"><RefreshCw size={18} /></button>
             <div className="w-10 h-10 bg-[#4C5C8A] text-white font-bold flex items-center justify-center rounded shadow-xl">AD</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-[#0F1115]">
          
          {activeTab === Tab.SHOWCASE && (
            <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700 pb-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SAMPLE_PRODUCTS.map(p => {
                   const Icon = getProductIcon(p.id);
                   const isActive = selectedProductId === p.id;
                   return (
                     <button key={p.id} onClick={() => setSelectedProductId(p.id)} className={`p-6 rounded-2xl border transition-all text-left space-y-4 ${isActive ? 'bg-[#4C5C8A] border-[#4C5C8A] shadow-2xl scale-105' : 'bg-[#161A22] border-[#1F242D] hover:border-[#4C5C8A]/50'}`}>
                       <Icon size={24} className={isActive ? 'text-white' : 'text-[#4C5C8A]'} />
                       <div>
                         <h4 className={`font-black uppercase tracking-widest text-xs ${isActive ? 'text-white' : 'text-zinc-500'}`}>{p.name}</h4>
                         <p className={`text-[10px] mt-1 font-mono ${isActive ? 'text-white/70' : 'text-zinc-700'}`}>{p.category}</p>
                       </div>
                     </button>
                   );
                })}
              </div>

              <div className="bg-[#161A22] border border-[#1F242D] rounded-[40px] p-12 md:p-20 shadow-2xl">
                 <h2 className="text-6xl font-black text-white mb-8">{selectedProduct.name}</h2>
                 <p className="text-2xl text-zinc-400 font-medium mb-16">{selectedProduct.description}</p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {selectedProduct.metrics.map((m, i) => (
                     <div key={i} className="bg-[#0F1115] p-8 rounded-3xl border border-[#1F242D]">
                        <p className="text-[10px] font-black text-zinc-600 uppercase mb-2">{m.label}</p>
                        <div className="flex items-baseline justify-between">
                           <span className="text-4xl font-mono font-black text-white">{m.value}</span>
                           <span className="text-[11px] font-bold text-[#3A7D44]">{m.trend}</span>
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          )}

          {activeTab === Tab.INGESTION && (
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
               <div className="bg-[#161A22] p-10 rounded-3xl border border-[#1F242D] shadow-2xl">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#C7CBD6] mb-8">Intelligence Ingestion Gate</h3>
                  <textarea 
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder={`Enter verbatim review for ${selectedProduct.name}...`}
                    className="w-full h-40 bg-[#0F1115] border border-[#1F242D] rounded-xl p-6 text-sm text-[#F8F9FB] outline-none focus:border-[#4C5C8A] transition-all resize-none"
                  />
                  
                  {batchProgress && (
                    <div className="mt-6 p-4 bg-[#0F1115] border border-[#4C5C8A]/30 rounded-xl">
                      <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                        <span>Batch Vectorizing...</span>
                        <span>{Math.round((batchProgress.current / batchProgress.total) * 100)}%</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4C5C8A] transition-all duration-300" style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}></div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                      <button onClick={() => fileInputRef.current?.click()} className="text-[10px] font-black text-zinc-500 hover:text-white uppercase flex items-center space-x-2"><Plus size={14}/><span>Import CSV</span></button>
                    </div>
                    <button onClick={handleAddReview} disabled={isProcessing || !newReviewText.trim()} className="bg-[#4C5C8A] hover:bg-[#5C6C9A] text-white px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center space-x-3 disabled:opacity-50 shadow-2xl">
                      {isProcessing ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
                      <span>Ingest & Analyze</span>
                    </button>
                  </div>
               </div>

               {enterpriseBreakdown && (
                 <div className="bg-[#0F1115] border border-[#4C5C8A]/30 p-10 rounded-3xl animate-in slide-in-from-top-4 duration-500 shadow-[0_0_100px_rgba(76,92,138,0.1)]">
                    <div className="flex items-center space-x-4 mb-8">
                       <CheckCircle2 size={24} className="text-[#3A7D44]" />
                       <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-white">Enterprise Breakdown Vector</h4>
                    </div>
                    <pre className="font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap selection:bg-[#4C5C8A]">
                       {enterpriseBreakdown}
                    </pre>
                 </div>
               )}
            </div>
          )}

          {activeTab === Tab.SENTIMENT && stats && (
            <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-[#161A22] p-10 rounded-[32px] border border-[#1F242D] border-t-4 border-t-[#3A7D44] relative overflow-hidden group">
                     <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-4">Positive Volume</p>
                     <div className="flex items-baseline space-x-4">
                        <span className="text-7xl font-mono font-black text-white">{stats.pos}</span>
                        <span className="text-xl font-black text-[#3A7D44]">{stats.sentimentDistribution[0].pct}%</span>
                     </div>
                  </div>
                  <div className="bg-[#161A22] p-10 rounded-[32px] border border-[#1F242D] border-t-4 border-t-[#4C5C8A] relative overflow-hidden group">
                     <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-4">Neutral Resonance</p>
                     <div className="flex items-baseline space-x-4">
                        <span className="text-7xl font-mono font-black text-white">{stats.neu}</span>
                        <span className="text-xl font-black text-[#4C5C8A]">{stats.sentimentDistribution[1].pct}%</span>
                     </div>
                  </div>
                  <div className="bg-[#161A22] p-10 rounded-[32px] border border-[#1F242D] border-t-4 border-t-[#B5474F] relative overflow-hidden group">
                     <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-4">Negative Friction</p>
                     <div className="flex items-baseline space-x-4">
                        <span className="text-7xl font-mono font-black text-white">{stats.neg}</span>
                        <span className="text-xl font-black text-[#B5474F]">{stats.sentimentDistribution[2].pct}%</span>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="bg-[#161A22] rounded-[40px] border border-[#1F242D] p-12 flex flex-col items-center justify-center shadow-2xl h-[600px]">
                     <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-12">Global Distribution Matrix</h3>
                     <div className="w-full h-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <RePieChart>
                           <Pie
                             data={stats.sentimentDistribution}
                             cx="50%"
                             cy="50%"
                             innerRadius={110}
                             outerRadius={160}
                             paddingAngle={8}
                             dataKey="value"
                             stroke="none"
                           >
                             {stats.sentimentDistribution.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                           </Pie>
                           <Tooltip content={<CustomTooltip />} />
                           <Legend 
                              verticalAlign="bottom" 
                              align="center"
                              iconType="rect"
                              formatter={(value, entry: any) => <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">{value} ({entry.payload.pct}%)</span>}
                           />
                         </RePieChart>
                       </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="bg-[#161A22] rounded-[40px] border border-[#1F242D] p-12 shadow-2xl h-[600px] flex flex-col">
                     <div className="flex items-center justify-between mb-12">
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">Sentiment Intensity Scan</h3>
                        <BarChartIcon className="text-[#4C5C8A]" size={20} />
                     </div>
                     <div className="flex-1 space-y-10 overflow-y-auto custom-scrollbar pr-4">
                        {stats.sentimentDistribution.map((item, idx) => (
                           <div key={idx} className="space-y-4">
                              <div className="flex justify-between items-end">
                                 <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">{item.name}</p>
                                    <p className="text-4xl font-mono font-black text-white">{item.value}</p>
                                 </div>
                                 <p className="text-xl font-black text-white">{item.pct}%</p>
                              </div>
                              <div className="w-full h-4 bg-[#0F1115] rounded-full overflow-hidden">
                                 <div 
                                    className="h-full transition-all duration-1000 ease-out" 
                                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                                 ></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === Tab.ASPECTS && stats && (
            <div className="space-y-10 animate-in fade-in duration-600 pb-20">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="bg-[#161A22] p-12 rounded-[40px] border border-[#1F242D] card-shadow h-[700px] flex flex-col">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-12">Feature Sentiment Matrix</h3>
                    <div className="flex-1">
                       <ResponsiveContainer width="100%" height="100%">
                         <BarChart layout="vertical" data={stats.aspectData} margin={{ left: 20, right: 20 }}>
                           <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1F242D" />
                           <XAxis type="number" hide domain={[-1, 1]} />
                           <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 14, fill: '#F8F9FB', fontWeight: 700}} width={140} />
                           <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.02)'}} />
                           <Bar dataKey="sentiment" radius={[0, 4, 4, 0]} barSize={32}>
                             {stats.aspectData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.sentiment >= 0 ? UI_COLORS.Positive : UI_COLORS.Critical} />
                             ))}
                           </Bar>
                         </BarChart>
                       </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-[#161A22] p-12 rounded-[40px] border border-[#1F242D] card-shadow h-[700px] flex flex-col">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-12">Strategic Priority Heatmap</h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                      {stats.aspectData.map((a, i) => (
                        <div key={i} className="p-8 bg-[#0F1115] rounded-[24px] border border-[#1F242D] flex items-center justify-between group hover:border-[#4C5C8A]/40 transition-all">
                           <div className="space-y-2">
                              <p className="text-[18px] font-black uppercase tracking-widest text-white group-hover:text-[#4C5C8A] transition-colors">{a.name}</p>
                              <div className="flex items-center space-x-4">
                                <span className="text-[10px] font-mono text-zinc-600 uppercase">Citations: {a.mentions} </span>
                                <div className={`w-2 h-2 rounded-full ${a.sentiment >= 0 ? 'bg-[#3A7D44]' : 'bg-[#B5474F]'}`}></div>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-black text-zinc-600 mb-2 uppercase tracking-tighter">Strategic Importance</p>
                              <div className="w-48 h-2 bg-zinc-900 rounded-full overflow-hidden">
                                 <div className="h-full bg-[#4C5C8A]" style={{ width: `${a.importance * 100}%` }}></div>
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === Tab.RISKS && stats && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700 pb-20">
               <div className="bg-[#161A22] rounded-[40px] border border-[#1F242D] overflow-hidden shadow-2xl">
                  <div className="p-12 border-b border-[#1F242D] bg-[#0F1115]/80 flex items-center justify-between">
                     <div className="flex items-center space-x-6">
                        <ShieldAlert size={32} className="text-[#B5474F]" />
                        <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-white">Risk State Queue</h3>
                     </div>
                     <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-4 py-2 border border-[#1F242D] rounded-full">All Non-Low Risk Vectors</span>
                  </div>

                  <div className="divide-y divide-[#1F242D] max-h-[700px] overflow-y-auto custom-scrollbar">
                     {stats.highRiskReviews.length === 0 ? (
                       <div className="p-24 text-center text-zinc-500 uppercase font-black text-xs tracking-widest">No critical vectors identified.</div>
                     ) : (
                       stats.highRiskReviews.map((r) => (
                         <div key={r.id} className="p-12 flex items-start space-x-12 hover:bg-white/[0.01] transition-all group border-l-8 border-transparent hover:border-l-[#B5474F]">
                            <div className="w-24 h-24 bg-[#0F1115] border border-[#1F242D] flex flex-col items-center justify-center rounded-3xl shrink-0 group-hover:border-[#B5474F]/40 transition-colors">
                               <span className="text-[10px] font-black text-zinc-600 uppercase mb-2">SSQ</span>
                               <span className={`text-4xl font-black ${r.analysis.score < 40 ? 'text-[#B5474F]' : 'text-[#C58B2A]'}`}>{r.analysis.score}</span>
                            </div>
                            <div className="flex-1 space-y-6">
                               <div className="flex items-center space-x-6">
                                  <span className="text-[10px] font-black uppercase tracking-widest bg-[#B5474F]/10 text-[#B5474F] px-4 py-1 rounded-full border border-[#B5474F]/20">Risk ID: {r.id}</span>
                                  <div className="flex space-x-2">
                                     {r.analysis.risks?.churn !== RiskLevel.LOW && r.analysis.risks?.churn && <span className="text-[9px] font-bold uppercase bg-[#B5474F] text-white px-2 py-0.5 rounded">Churn</span>}
                                     {r.analysis.risks?.brand !== RiskLevel.LOW && r.analysis.risks?.brand && <span className="text-[9px] font-bold uppercase bg-[#C58B2A] text-white px-2 py-0.5 rounded">Brand</span>}
                                     {r.analysis.risks?.support !== RiskLevel.LOW && r.analysis.risks?.support && <span className="text-[9px] font-bold uppercase bg-[#4C5C8A] text-white px-2 py-0.5 rounded">Support</span>}
                                  </div>
                                  <span className="text-[10px] font-mono text-zinc-700 uppercase">{r.source} • {new Date(r.timestamp).toLocaleDateString()}</span>
                               </div>
                               <p className="text-2xl font-medium text-[#C7CBD6] leading-relaxed italic group-hover:text-white transition-colors">"{r.text}"</p>
                               <div className="bg-[#0F1115] p-6 rounded-2xl border border-[#1F242D]">
                                  <p className="text-[14px] font-bold text-zinc-400 italic">Deduction: {r.analysis.risks?.reason || "Inconclusive telemetry."}</p>
                               </div>
                            </div>
                         </div>
                       ))
                     )}
                  </div>
               </div>
            </div>
          )}

          {activeTab === Tab.SCORE && stats && (
            <div className="max-w-7xl mx-auto space-y-12 animate-in zoom-in-95 duration-700 pb-20">
               <div className="bg-[#161A22] rounded-[60px] border border-[#1F242D] p-20 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4C5C8A] to-transparent"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="text-center lg:text-left space-y-12">
                       <div>
                         <div className="flex items-center space-x-4 mb-4 justify-center lg:justify-start">
                           <Binary size={20} className="text-[#4C5C8A]" />
                           <p className="text-[14px] font-black text-zinc-500 uppercase tracking-[1em]">Strategic Quotient (SSQ)</p>
                         </div>
                         <h2 className="text-[240px] font-black tracking-tighter text-white leading-none drop-shadow-[0_0_80px_rgba(76,92,138,0.4)]">
                            {stats.healthScore}
                         </h2>
                       </div>
                       
                       <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                          <div className="px-8 py-4 bg-[#0F1115] border border-[#1F242D] rounded-2xl flex items-center space-x-4">
                             <ShieldCheck size={18} className="text-[#3A7D44]" />
                             <div>
                                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Statistical Integrity</p>
                                <p className="text-lg font-bold text-white">{(stats.avgConfidence * 100).toFixed(1)}% Confidence</p>
                             </div>
                          </div>
                          <div className="px-8 py-4 bg-[#0F1115] border border-[#1F242D] rounded-2xl flex items-center space-x-4">
                             <Clock size={18} className="text-[#4C5C8A]" />
                             <div>
                                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Temporal Parity</p>
                                <p className="text-lg font-bold text-white">{stats.temporalStability > 85 ? 'High Stability' : 'Moderate Volatility'}</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="bg-[#0F1115] p-12 rounded-[40px] border border-[#1F242D] space-y-10">
                       <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 border-b border-[#1F242D] pb-6">Algorithmic Weighting Vectors</h3>
                       
                       <div className="space-y-8">
                          {[
                            { label: 'Base Sentiment Intensity', weight: '40%', val: stats.sentimentIntensity, color: '#3A7D44' },
                            { label: 'Volume-Weighted Prevalence', weight: '25%', val: stats.volumePrevalence, color: '#4C5C8A' },
                            { label: 'Temporal Stability Index', weight: '20%', val: stats.temporalStability, color: '#C58B2A' },
                            { label: 'Model Confidence Variance', weight: '15%', val: stats.confidenceVariance, color: '#B5474F' }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-3">
                               <div className="flex justify-between items-end">
                                  <div>
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{item.label}</p>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-[14px] font-mono font-black text-white">{item.val.toFixed(1)}%</span>
                                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-white/5 rounded text-zinc-500 border border-white/10">{getVectorStatus(item.val)}</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[10px] font-mono text-zinc-600 block uppercase">Contribution</span>
                                    <span className="text-[11px] font-mono text-zinc-400">{item.weight} Coefficient</span>
                                  </div>
                               </div>
                               <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(255,255,255,0.1)]" 
                                    style={{ width: `${item.val}%`, backgroundColor: item.color }}
                                  ></div>
                               </div>
                            </div>
                          ))}
                       </div>

                       <div className="pt-6 mt-10 border-t border-[#1F242D]">
                          <p className="text-xs text-zinc-500 italic leading-relaxed">
                            *The SSQ represents a normalized proprietary index calculated by aggregating multi-dimensional vector inputs across all product cohorts. Any score above 75 is considered "Tier 1: Strategic Lead."
                          </p>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-[#161A22] p-8 rounded-3xl border border-[#1F242D] space-y-4">
                     <div className="w-10 h-10 bg-[#4C5C8A]/10 flex items-center justify-center rounded-xl text-[#4C5C8A] mb-2"><Gauge size={20} /></div>
                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active Vector Count</p>
                     <p className="text-3xl font-mono font-black text-white">{stats.total}</p>
                     <p className="text-[11px] text-[#3A7D44] font-bold">Σ Samples Processed</p>
                  </div>
                  <div className="bg-[#161A22] p-8 rounded-3xl border border-[#1F242D] space-y-4">
                     <div className="w-10 h-10 bg-[#3A7D44]/10 flex items-center justify-center rounded-xl text-[#3A7D44] mb-2"><CheckCircle2 size={20} /></div>
                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Data Integrity Score</p>
                     <p className="text-3xl font-mono font-black text-white">{(stats.avgConfidence * 100).toFixed(2)}%</p>
                     <p className="text-[11px] text-zinc-500 font-bold">Audit: High Trust</p>
                  </div>
                  <div className="bg-[#161A22] p-8 rounded-3xl border border-[#1F242D] space-y-4">
                     <div className="w-10 h-10 bg-[#C58B2A]/10 flex items-center justify-center rounded-xl text-[#C58B2A] mb-2"><AlertCircle size={20} /></div>
                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Signal Variance (σ)</p>
                     <p className="text-3xl font-mono font-black text-white">{stats.stdDev.toFixed(2)}</p>
                     <p className="text-[11px] text-[#B5474F] font-bold">Volatility Measure</p>
                  </div>
                  <div className="bg-[#161A22] p-8 rounded-3xl border border-[#1F242D] space-y-4">
                     <div className="w-10 h-10 bg-[#B5474F]/10 flex items-center justify-center rounded-xl text-[#B5474F] mb-2"><Database size={20} /></div>
                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Ingestion Sources</p>
                     <p className="text-3xl font-mono font-black text-white">13</p>
                     <p className="text-[11px] text-zinc-500 font-bold">Verified Connectors</p>
                  </div>
               </div>
            </div>
          )}

          {activeTab === Tab.EXECUTIVE && (
            <div className="max-w-5xl mx-auto space-y-16 animate-in slide-in-from-top-10 duration-700 pb-20">
               {!report ? (
                 <div className="bg-[#161A22] p-24 border border-[#1F242D] rounded-[40px] text-center shadow-2xl space-y-12">
                    <FileText size={64} className="text-[#4C5C8A] mx-auto opacity-50 mb-8" />
                    <h3 className="text-5xl font-black uppercase tracking-tighter text-white">Strategy Synthesis</h3>
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em]">Adaptive Intelligence Mode: Active</p>
                    <button onClick={async () => {
                      setLoading(true);
                      const dataSummary = `Product: ${selectedProduct.name}, SSQ: ${stats?.healthScore}, Total Samples: ${stats?.total}, StdDev: ${stats?.stdDev.toFixed(2)}`;
                      const res = await aiService.generateExecutiveReport(dataSummary);
                      setReport(res);
                      setLoading(false);
                    }} disabled={loading} className="px-20 py-6 bg-[#4C5C8A] text-white font-black uppercase tracking-[0.4em] text-[12px] hover:bg-[#5C6C9A] transition-all shadow-2xl flex items-center space-x-6 mx-auto disabled:opacity-50">
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <TargetIcon size={20} />}
                      <span>Classify & Synthesize</span>
                    </button>
                 </div>
               ) : (
                 <div className="bg-[#F8F9FB] text-[#0F1115] p-24 shadow-[0_80px_160px_rgba(0,0,0,0.6)] rounded-sm animate-in zoom-in-95 duration-500 relative">
                    <button onClick={() => setReport(null)} className="absolute top-12 right-12 text-zinc-400 hover:text-black transition-colors"><X size={32} /></button>
                    <div className="prose prose-zinc max-w-none text-[#0F1115] font-mono text-xl whitespace-pre-wrap leading-relaxed">
                       {report}
                    </div>
                 </div>
               )}
            </div>
          )}

          {activeTab === Tab.ASSISTANT && (
            <div className="h-[78vh] flex flex-col max-w-6xl mx-auto bg-[#161A22] border border-[#1F242D] rounded-[40px] overflow-hidden shadow-2xl">
               <div className="p-12 border-b border-[#1F242D] flex items-center justify-between bg-[#0F1115]/60 backdrop-blur-xl">
                  <div className="flex items-center space-x-6">
                     <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></div>
                     <h3 className="text-xl font-black uppercase tracking-[0.4em] text-white">Adaptive Terminal</h3>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded">Intent: Auto-Detect</span>
               </div>
               <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-16 space-y-12 custom-scrollbar bg-[#0F1115]">
                  {chatHistory.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-30 text-center space-y-8">
                      <Cpu size={80} />
                      <p className="text-2xl font-black uppercase tracking-widest">Awaiting Strategic Query</p>
                      <p className="text-[11px] uppercase tracking-widest text-[#4C5C8A]">Inference Engine Standby</p>
                    </div>
                  )}
                  {chatHistory.map((chat, i) => (
                    <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                      <div className={`max-w-[90%] px-10 py-8 rounded-[32px] text-xl leading-relaxed shadow-2xl ${chat.role === 'user' ? 'bg-[#4C5C8A] text-white font-black italic' : 'bg-[#161A22] border border-[#1F242D] text-[#C7CBD6] font-mono'}`}>
                        {chat.text}
                      </div>
                    </div>
                  ))}
               </div>
               <div className="p-12 bg-[#161A22] border-t border-[#1F242D] flex items-center space-x-10">
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)} 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && chatInput.trim() && !loading) {
                        (async () => {
                          const q = chatInput;
                          setChatInput('');
                          setChatHistory(p => [...p, {role: 'user', text: q}]);
                          setLoading(true);
                          const res = await aiService.chatWithData(q, `Product: ${selectedProduct.name}, Score: ${stats?.healthScore}, Total Samples: ${stats?.total}, StdDev: ${stats?.stdDev.toFixed(2)}`);
                          setChatHistory(p => [...p, {role: 'ai', text: res}]);
                          setLoading(false);
                        })();
                      }
                    }} 
                    placeholder="Interrogate strategy..." 
                    className="flex-1 bg-[#0F1115] border-b-2 border-transparent focus:border-[#4C5C8A] transition-all px-8 py-6 text-2xl font-black italic text-[#F8F9FB] outline-none placeholder:text-zinc-800" 
                  />
                  <button 
                    disabled={loading || !chatInput.trim()}
                    onClick={async () => {
                      const q = chatInput;
                      setChatInput('');
                      setChatHistory(p => [...p, {role: 'user', text: q}]);
                      setLoading(true);
                      const res = await aiService.chatWithData(q, `Product: ${selectedProduct.name}, Score: ${stats?.healthScore}, StdDev: ${stats?.stdDev.toFixed(2)}`);
                      setChatHistory(p => [...p, {role: 'ai', text: res}]);
                      setLoading(false);
                    }}
                    className="bg-[#4C5C8A] text-white w-20 h-20 rounded-full flex items-center justify-center shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Send />}
                  </button>
               </div>
            </div>
          )}

        </div>
      </main>

      {showRefreshConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
           <div className="bg-[#161A22] border border-[#1F242D] w-full max-w-lg rounded-[40px] p-12 space-y-12 shadow-2xl">
              <h3 className="text-2xl font-black uppercase tracking-widest text-white">Synchronize Context</h3>
              <p className="text-xl text-zinc-400 font-medium leading-relaxed italic">"Initialize global state refresh. Archiving current session vectors. Proceed?"</p>
              <div className="flex space-x-6">
                 <button onClick={() => setShowRefreshConfirm(false)} className="px-10 py-6 border border-[#1F242D] text-zinc-500 font-black uppercase text-[12px] tracking-widest rounded-2xl">Abort</button>
                 <button onClick={handleGlobalRefresh} className="px-10 py-6 bg-[#4C5C8A] text-white font-black uppercase text-[12px] tracking-widest rounded-2xl shadow-2xl">Proceed</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
